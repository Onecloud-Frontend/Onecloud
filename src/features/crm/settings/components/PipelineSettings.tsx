import { PipelineSettingsForm } from "../forms/PipelineSettingsForm";
import { usePipelineSettings } from "../hooks/usePipelineSettings";

export function PipelineSettings() {
  const { settings, loading, saving, error, saveSettings } =
    usePipelineSettings();

  if (loading) {
    return <div>Loading pipeline settings...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!settings) {
    return <div>No pipeline settings available.</div>;
  }

  return (
    <PipelineSettingsForm
      settings={settings}
      saving={saving}
      onSave={saveSettings}
    />
  );
}
