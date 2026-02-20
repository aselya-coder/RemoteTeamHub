import { useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormModal } from "../components/FormModal";

export function Landing() {
  const { state, actions } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const form = document.getElementById("landing-form") as HTMLFormElement;
    const formData = new FormData(form);
    
    await actions.updateLanding({
      hero_title: formData.get("hero_title") as string,
      hero_subtitle: formData.get("hero_subtitle") as string,
      hero_image: formData.get("hero_image") as string,
      CTA_text: formData.get("CTA_text") as string,
      cta_title: formData.get("cta_title") as string,
      cta_subtitle: formData.get("cta_subtitle") as string,
      cta_button_text: formData.get("cta_button_text") as string,
    });
    
    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Landing Page</h1>
          <p className="text-muted-foreground">Manage hero section and CTA content</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Content</Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-2">
            <p><strong>Title:</strong> {state.landing.hero_title}</p>
            <p><strong>Subtitle:</strong> {state.landing.hero_subtitle}</p>
            <p><strong>Image:</strong> {state.landing.hero_image}</p>
            <p><strong>CTA Text:</strong> {state.landing.CTA_text}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">CTA Section</h2>
          <div className="space-y-2">
            <p><strong>Title:</strong> {state.landing.cta_title}</p>
            <p><strong>Subtitle:</strong> {state.landing.cta_subtitle}</p>
            <p><strong>Button Text:</strong> {state.landing.cta_button_text}</p>
          </div>
        </div>
      </div>

      <FormModal
        open={isEditing}
        onOpenChange={setIsEditing}
        title="Edit Landing Page"
        onSubmit={handleSave}
      >
        <form id="landing-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input id="hero_title" name="hero_title" defaultValue={state.landing.hero_title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Textarea id="hero_subtitle" name="hero_subtitle" defaultValue={state.landing.hero_subtitle} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_image">Hero Image URL</Label>
            <Input id="hero_image" name="hero_image" defaultValue={state.landing.hero_image} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="CTA_text">CTA Text</Label>
            <Input id="CTA_text" name="CTA_text" defaultValue={state.landing.CTA_text} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_title">CTA Title</Label>
            <Input id="cta_title" name="cta_title" defaultValue={state.landing.cta_title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_subtitle">CTA Subtitle</Label>
            <Textarea id="cta_subtitle" name="cta_subtitle" defaultValue={state.landing.cta_subtitle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_button_text">CTA Button Text</Label>
            <Input id="cta_button_text" name="cta_button_text" defaultValue={state.landing.cta_button_text} />
          </div>
        </form>
      </FormModal>
    </div>
  );
}
