"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, SkipBack, SkipForward, Play } from "lucide-react"
import { Button } from "../ui/button"

interface AudioTrack {
  id: string
  title: string
  src: string
}

interface BackgroundAudioPlayerProps {
  tracks: AudioTrack[]
  autoPlay?: boolean
  volume?: number
  className?: string
}

export function BackgroundAudioPlayer({
  tracks,
  autoPlay = false,
  volume = 0.3,
  className = "",
}: BackgroundAudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentVolume] = useState(volume)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize audio
  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      audioRef.current.volume = currentVolume
      audioRef.current.src = tracks[currentTrackIndex].src

      if (autoPlay) {
        audioRef.current.play().catch(() => {
          // Auto-play was prevented by browser
          setIsPlaying(false)
        })
        setIsPlaying(true)
      }
    }
  }, [autoPlay, currentTrackIndex, currentVolume, tracks])

  // Handle track change
  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      const wasPlaying = isPlaying
      audioRef.current.src = tracks[currentTrackIndex].src

      if (wasPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
      }
    }
  }, [currentTrackIndex, isPlaying, tracks])

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : currentVolume
    }
  }, [currentVolume, isMuted])

  const handleTrackEnd = () => {
    // Move to next track, or loop back to first
    const nextIndex = (currentTrackIndex + 1) % tracks.length
    setCurrentTrackIndex(nextIndex)
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length
    setCurrentTrackIndex(nextIndex)
  }

  const playPreviousTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    setCurrentTrackIndex(prevIndex)
  }

  if (tracks.length === 0) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="bg-white/90 backdrop-blur-sm  rounded-full shadow-sm p-2 flex items-center space-x-2 space-x-reverse">
        {/* Previous Track Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={playPreviousTrack}
          className="rounded-full p-2 hover:bg-primary/10"
          aria-label="Previous track"
        >
          <SkipBack className="h-4 w-4 text-primary" />
        </Button>

        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="rounded-full p-2 hover:bg-primary/10"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-primary animate-pulse" />
              <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          ) : (
            <Play className="h-4 w-4 text-primary" />
          )}
        </Button>

        {/* Next Track Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={playNextTrack}
          className="rounded-full p-2 hover:bg-primary/10"
          aria-label="Next track"
        >
          <SkipForward className="h-4 w-4 text-primary" />
        </Button>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="rounded-full p-2 hover:bg-primary/10"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-neutral-mid" /> : <Volume2 className="h-4 w-4 text-primary" />}
        </Button>

        {/* Track Info (on hover) */}
        <div className="hidden md:block group relative">
          <div className="text-xs text-primary font-medium px-2 cursor-default">
            {tracks[currentTrackIndex]?.title || "Music"}
          </div>

          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-primary text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Track {currentTrackIndex + 1} of {tracks.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// Example usage component
export function BackgroundAudioPlayerExample() {
  const sampleTracks: AudioTrack[] = [
    {
      id: "1",
      title: "Luxury Ambience",
      src: "/audio/luxury-ambience.mp3", // You'll need to add actual audio files
    },
    {
      id: "2",
      title: "Elegant Jazz",
      src: "/audio/elegant-jazz.mp3",
    },
    {
      id: "3",
      title: "Sophisticated Lounge",
      src: "/audio/sophisticated-lounge.mp3",
    },
  ]

  return (
    <BackgroundAudioPlayer
      tracks={sampleTracks}
      autoPlay={false} // Set to true if you want auto-play (may be blocked by browsers)
      volume={0.2}
    />
  )
}
