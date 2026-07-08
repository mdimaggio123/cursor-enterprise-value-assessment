import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface TalkTrack {
  persona: string;
  quote: string;
}

interface AeTalkTrackProps {
  tracks: TalkTrack[];
  title?: string;
  description?: string;
}

export function AeTalkTrack({
  tracks,
  title = "AE Talk Track",
  description = "Persona-specific language for discovery and executive conversations.",
}: AeTalkTrackProps) {
  if (tracks.length === 0) return null;

  return (
    <Card className="border-primary/15 bg-primary/[0.03]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {tracks.map((track) => (
          <div
            key={track.persona}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <Badge variant="secondary" className="mb-2">
              {track.persona}
            </Badge>
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{track.quote}&rdquo;
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
