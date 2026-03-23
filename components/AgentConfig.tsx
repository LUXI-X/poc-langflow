'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, X, RefreshCw } from 'lucide-react';
import { AgentConfig, OutputSchemaField } from '@/types/langflow';
import LangflowAPI from '@/lib/langflow-api';

interface AgentConfigProps {
  config: AgentConfig;
  onConfigChange: (config: AgentConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentConfigComponent({
  config,
  onConfigChange,
  isOpen,
  onClose
}: AgentConfigProps) {
  const [localConfig, setLocalConfig] = useState<AgentConfig>(config);
  const [newSchemaField, setNewSchemaField] = useState<OutputSchemaField>({
    name: '',
    description: '',
    type: 'str',
    multiple: false
  });
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<boolean>(false);
  const langflowAPI = new LangflowAPI();

  const handleSave = () => {
    onConfigChange(localConfig);
    onClose();
  };

  // Load Ollama models when component opens
  useEffect(() => {
    if (isOpen && localConfig.agent_llm === 'Ollama') {
      loadOllamaModels();
      checkOllamaStatus();
    }
  }, [isOpen, localConfig.agent_llm]);

  const loadOllamaModels = async () => {
    setIsLoadingModels(true);
    try {
      const models = await langflowAPI.getOllamaModels(localConfig.ollama_base_url);
      setOllamaModels(models);
    } catch (error) {
      console.error('Failed to load Ollama models:', error);
      setOllamaModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const checkOllamaStatus = async () => {
    const status = await langflowAPI.checkOllamaStatus(localConfig.ollama_base_url);
    setOllamaStatus(status);
  };

  const addSchemaField = () => {
    if (newSchemaField.name.trim()) {
      setLocalConfig((prev: AgentConfig) => ({
        ...prev,
        output_schema: [...(prev.output_schema || []), newSchemaField]
      }));
      setNewSchemaField({
        name: '',
        description: '',
        type: 'str',
        multiple: false
      });
    }
  };

  const removeSchemaField = (index: number) => {
    setLocalConfig((prev: AgentConfig) => ({
      ...prev,
      output_schema: prev.output_schema?.filter((_: OutputSchemaField, i: number) => i !== index) || []
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-black font-semibold flex items-center gap-2">
            <Settings size={20} />
            Agent Configuration
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Model Provider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model Provider
            </label>
            <select
              value={localConfig.agent_llm}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, agent_llm: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="OpenAI">OpenAI</option>
              <option value="Anthropic">Anthropic</option>
              <option value="Google">Google</option>
              <option value="Ollama">Ollama (Local)</option>
            </select>
          </div>

          {/* API Key */}
          {localConfig.agent_llm !== 'Ollama' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={localConfig.api_key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, api_key: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your API key"
              />
            </div>
          )}

          {/* Ollama Configuration */}
          {localConfig.agent_llm === 'Ollama' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ollama Base URL
                </label>
                <input
                  type="text"
                  value={localConfig.ollama_base_url || 'http://localhost:11434'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, ollama_base_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="http://localhost:11434"
                />
                <div className="mt-1 flex items-center gap-2">
                  <span className={`text-xs ${ollamaStatus ? 'text-green-600' : 'text-red-600'}`}>
                    {ollamaStatus ? '✅ Ollama is running' : '❌ Ollama is not running'}
                  </span>
                  <button
                    type="button"
                    onClick={checkOllamaStatus}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Check Status
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ollama Model
                </label>
                <div className="flex gap-2">
                  <select
                    value={localConfig.ollama_model || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, ollama_model: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a model</option>
                    {ollamaModels.map((model: string) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={loadOllamaModels}
                    disabled={isLoadingModels}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoadingModels ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  </button>
                </div>
                {ollamaModels.length === 0 && !isLoadingModels && (
                  <p className="text-xs text-gray-500 mt-1">
                    No models found. Make sure Ollama is running and you have models installed.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={localConfig.temperature || 0.7}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Controls randomness: 0 = focused, 1 = balanced, 2 = creative
                </p>
              </div>
            </>
          )}

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agent Instructions
            </label>
            <textarea
              value={localConfig.system_prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLocalConfig((prev: AgentConfig) => ({ ...prev, system_prompt: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter system prompt for the agent"
            />
          </div>

          {/* Max Output Tokens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Output Tokens
            </label>
            <input
              type="number"
              value={localConfig.max_output_tokens || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ 
                ...prev, 
                max_output_tokens: e.target.value ? parseInt(e.target.value) : undefined 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2048"
            />
          </div>

          {/* Number of Messages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chat History Messages
            </label>
            <input
              type="number"
              value={localConfig.n_messages}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ 
                ...prev, 
                n_messages: parseInt(e.target.value) || 100 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Current Date Tool */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="add_current_date_tool"
              checked={localConfig.add_current_date_tool}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalConfig((prev: AgentConfig) => ({ 
                ...prev, 
                add_current_date_tool: e.target.checked 
              }))}
              className="mr-2"
            />
            <label htmlFor="add_current_date_tool" className="text-sm font-medium text-gray-700">
              Add Current Date Tool
            </label>
          </div>

          {/* Output Schema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Schema (Optional)
            </label>
            
            {/* Existing schema fields */}
            {localConfig.output_schema && localConfig.output_schema.length > 0 && (
              <div className="space-y-2 mb-3">
                {localConfig.output_schema.map((field: OutputSchemaField, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="flex-1 text-sm">
                      <strong>{field.name}</strong> ({field.type}
                      {field.multiple ? '[]' : ''}) - {field.description}
                    </span>
                    <button
                      onClick={() => removeSchemaField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new schema field */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Field name"
                value={newSchemaField.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSchemaField((prev: OutputSchemaField) => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newSchemaField.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewSchemaField((prev: OutputSchemaField) => ({ 
                  ...prev, 
                  type: e.target.value as 'str' | 'int' | 'float' | 'bool' | 'dict'
                }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="str">String</option>
                <option value="int">Integer</option>
                <option value="float">Float</option>
                <option value="bool">Boolean</option>
                <option value="dict">Dictionary</option>
              </select>
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Field description"
                value={newSchemaField.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSchemaField((prev: OutputSchemaField) => ({ ...prev, description: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={newSchemaField.multiple}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSchemaField((prev: OutputSchemaField) => ({ ...prev, multiple: e.target.checked }))}
                />
                <span className="text-sm">List</span>
              </label>
            </div>
            <button
              onClick={addSchemaField}
              disabled={!newSchemaField.name.trim()}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              Add Field
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Save size={16} />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}