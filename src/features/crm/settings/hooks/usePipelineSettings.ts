import { useCallback, useEffect, useState } from "react";

import { pipelineSettingsService } from "../services/pipelineSettingsService";
import type { PipelineSettings } from "../types/pipelineSettings.types";

export function usePipelineSettings() {
  const [settings, setSettings] = useState<PipelineSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await pipelineSettingsService.getSettings();

      setSettings(data);
    } catch {
      setError("Failed to load pipeline settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async (nextSettings: PipelineSettings) => {
    try {
      setSaving(true);
      setError(null);

      const updated =
        await pipelineSettingsService.updateSettings(nextSettings);

      setSettings(updated);
    } catch {
      setError("Failed to save pipeline settings.");

      throw new Error("Failed to save pipeline settings.");
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    saving,
    error,
    reload: loadSettings,
    saveSettings,
  };
}
