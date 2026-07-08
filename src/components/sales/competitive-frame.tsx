import { Scale } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import competitiveData from "@/data/competitive-frame.json";

export function CompetitiveFrame() {
  const { title, subtitle, criteria } = competitiveData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Scale className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {criteria.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border bg-muted/20 p-4"
            >
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.hypothesis}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
