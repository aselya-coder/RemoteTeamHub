import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function AdminLanding() {
  const { state, actions } = useAdminStore();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Landing</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs">Hero Title</label>
          <Input value={state.landing.hero_title} onChange={(e) => actions.updateLanding({ hero_title: e.target.value })} />
        </div>
        <div>
          <label className="text-xs">CTA Text</label>
          <Input value={state.landing.CTA_text} onChange={(e) => actions.updateLanding({ CTA_text: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs">Hero Subtitle</label>
          <Textarea rows={3} value={state.landing.hero_subtitle} onChange={(e) => actions.updateLanding({ hero_subtitle: e.target.value })} />
        </div>
        <div>
          <label className="text-xs">CTA Title</label>
          <Input value={state.landing.cta_title || ""} onChange={(e) => actions.updateLanding({ cta_title: e.target.value })} />
        </div>
        <div>
          <label className="text-xs">CTA Button Text</label>
          <Input value={state.landing.cta_button_text || ""} onChange={(e) => actions.updateLanding({ cta_button_text: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs">CTA Subtitle</label>
          <Textarea rows={2} value={state.landing.cta_subtitle || ""} onChange={(e) => actions.updateLanding({ cta_subtitle: e.target.value })} />
        </div>
      </div>
      <Button variant="outline" disabled>
        Disimpan Otomatis
      </Button>
    </div>
  );
}
