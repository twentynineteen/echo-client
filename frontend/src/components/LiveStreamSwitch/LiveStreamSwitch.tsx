import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


function LiveStreamSwitch() {
  return (
    <div className="flex items-center space-x-2">
    <Switch id="live-stream" />
    <Label htmlFor="live-stream">Live Stream</Label>
  </div>
  )
}

export default LiveStreamSwitch