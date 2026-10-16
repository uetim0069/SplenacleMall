import { Image } from '@/components/ui/image';
import { Play } from 'lucide-react';

export default function VideoPlayer({ url, poster, caption, className = 'aspect-video' }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-primary ${className}`}>
      {url ? (
        <video
          src={url}
          poster={poster}
          controls
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <Image src={poster} alt={caption || 'Product testing'} className="h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/72 p-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Play className="h-6 w-6 fill-accent-foreground text-accent-foreground" />
            </span>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-primary-foreground">
              {caption || 'Test footage is attached to every order before dispatch.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
