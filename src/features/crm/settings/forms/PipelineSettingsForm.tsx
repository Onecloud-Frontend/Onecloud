import { useEffect, useState } from "react";

import type {
  Pipeline,
  PipelineSettings,
  PipelineStage,
} from "../types/pipelineSettings.types";

import { validatePipeline } from "../schemas/pipelineSettings.schema";

interface PipelineSettingsFormProps {
  settings: PipelineSettings;
  saving: boolean;
  onSave: (settings: PipelineSettings) => Promise<void>;
}

export function PipelineSettingsForm({
  settings,
  saving,
  onSave,
}: PipelineSettingsFormProps) {
  const [formData, setFormData] = useState<PipelineSettings>(settings);

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const updatePipeline = (pipelineId: string, updates: Partial<Pipeline>) => {
    setFormData((current) => ({
      ...current,

      pipelines: current.pipelines.map((pipeline) =>
        pipeline.id === pipelineId
          ? {
              ...pipeline,
              ...updates,
            }
          : pipeline,
      ),
    }));
  };

  const updateStage = (
    pipelineId: string,
    stageId: string,
    updates: Partial<PipelineStage>,
  ) => {
    setFormData((current) => ({
      ...current,

      pipelines: current.pipelines.map((pipeline) =>
        pipeline.id === pipelineId
          ? {
              ...pipeline,

              stages: pipeline.stages.map((stage) =>
                stage.id === stageId
                  ? {
                      ...stage,
                      ...updates,
                    }
                  : stage,
              ),
            }
          : pipeline,
      ),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = formData.pipelines.flatMap(validatePipeline);

    if (errors.length > 0) {
      setMessage(errors[0]);
      return;
    }

    await onSave(formData);

    setMessage("Pipeline settings saved successfully.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Pipeline Settings</h2>

        <p>Configure pipeline and opportunity stages.</p>
      </div>

      <div>
        <label htmlFor="default-pipeline">Default Pipeline</label>

        <select
          id="default-pipeline"
          value={formData.defaultPipelineId}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              defaultPipelineId: event.target.value,
            }))
          }
        >
          {formData.pipelines.map((pipeline) => (
            <option key={pipeline.id} value={pipeline.id}>
              {pipeline.name}
            </option>
          ))}
        </select>
      </div>

      {formData.pipelines.map((pipeline) => (
        <section key={pipeline.id}>
          <h3>{pipeline.name}</h3>

          <div>
            <label>
              Pipeline Name
              <input
                value={pipeline.name}
                onChange={(event) =>
                  updatePipeline(pipeline.id, {
                    name: event.target.value,
                  })
                }
              />
            </label>
          </div>

          <div>
            <label>
              Description
              <textarea
                value={pipeline.description}
                onChange={(event) =>
                  updatePipeline(pipeline.id, {
                    description: event.target.value,
                  })
                }
              />
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={pipeline.active}
                onChange={(event) =>
                  updatePipeline(pipeline.id, {
                    active: event.target.checked,
                  })
                }
              />
              Active
            </label>
          </div>

          <h4>Pipeline Stages</h4>

          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Stage</th>
                <th>Probability</th>
                <th>Active</th>
              </tr>
            </thead>

            <tbody>
              {pipeline.stages
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((stage) => (
                  <tr key={stage.id}>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={stage.order}
                        onChange={(event) =>
                          updateStage(pipeline.id, stage.id, {
                            order: Number(event.target.value),
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        value={stage.name}
                        onChange={(event) =>
                          updateStage(pipeline.id, stage.id, {
                            name: event.target.value,
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={stage.probability}
                        onChange={(event) =>
                          updateStage(pipeline.id, stage.id, {
                            probability: Number(event.target.value),
                          })
                        }
                      />
                      %
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={stage.active}
                        onChange={(event) =>
                          updateStage(pipeline.id, stage.id, {
                            active: event.target.checked,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}

      {message && <p>{message}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
