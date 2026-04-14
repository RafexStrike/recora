// File: client/src/components/ai/ChatComposer.tsx
'use client';

import { KeyboardEvent } from 'react';
import { ProviderOption, ModelOption } from '@/hooks/useAIChat';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap, Database, Cpu, KeyRound } from 'lucide-react';
import LoadingSpinnerCustom from '@/components/LoadingSpinnerCustom';

interface Props {
  // provider/model/key
  providers: ProviderOption[];
  providersLoading: boolean;
  models: ModelOption[];
  modelsLoading: boolean;
  provider: string;
  onProviderChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  apiKey: string;
  onApiKeyChange: (v: string) => void;
  // prompt
  prompt: string;
  onPromptChange: (v: string) => void;
  // actions
  onGenerate: () => void;
  canGenerate: boolean;
  loading: boolean;
}

export default function ChatComposer({
  providers, providersLoading,
  models, modelsLoading,
  provider, onProviderChange,
  model, onModelChange,
  apiKey, onApiKeyChange,
  prompt, onPromptChange,
  onGenerate, canGenerate, loading,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Allow newline with Shift or Ctrl/Cmd + Enter
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return;
      }
      // Plain Enter submits if able to generate
      if (canGenerate) {
        e.preventDefault();
        onGenerate();
      }
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-b from-[#0f0f12] via-[#0d0d10] to-[#0a0a0d] px-0 pt-4 sm:pt-5 pb-4 sm:pb-6 overflow-x-hidden w-full backdrop-blur-sm shadow-2xl shadow-black/50">
      {/* Centered composer container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5 bg-white/2 rounded-3xl p-5 sm:p-6">
        {/* Prompt textarea + generate button row */}
        <div className="flex flex-col sm:flex-row gap-3 items-end w-full">
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Describe the 2D animation you want to generate…"
            disabled={loading}
            className="flex-1 resize-none bg-[#0f0f14] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus-visible:outline-none focus-visible:border-white/12 focus-visible:bg-[#111118] transition-colors duration-150 disabled:opacity-50 leading-relaxed min-h-[90px] hover:border-white/10"
          />
          <Button
            onClick={onGenerate}
            disabled={!canGenerate}
            title={canGenerate ? 'Generate (⌘ Enter)' : 'Fill in provider, model, API key and prompt to generate'}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border-none flex-shrink-0 h-[90px] sm:h-auto ${
              canGenerate
                ? 'bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                : 'bg-gray-700/40 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            {loading ? (
              <>
                <LoadingSpinnerCustom size="sm" variant="dots" />
                <span className="hidden sm:inline text-sm">Creating magic...</span>
              </>
            ) : (
              <>
                <Zap className="size-4 fill-white" />
                <span className="hidden sm:inline text-sm">Generate</span>
              </>
            )}
          </Button>
        </div>

        {/* Controls row - stack on mobile */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full overflow-x-auto pb-1">
          {/* Provider */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold whitespace-nowrap flex-shrink-0 uppercase tracking-wide">
              <Database className="size-4 text-[#7C3AED]" />
              <span className="hidden sm:inline">Provider</span>
            </span>
            <Select value={provider} onValueChange={(v) => onProviderChange(v ?? '')}>
              <SelectTrigger
                disabled={providersLoading}
                className="flex-1 sm:flex-none bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[130px] focus:outline-none focus:border-white/12 focus:bg-[#111118] hover:border-white/10 transition-colors duration-150 shadow-sm"
              >
                <SelectValue placeholder={providersLoading ? 'Loading…' : 'Provider'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {providers.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {p.label || p.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold whitespace-nowrap flex-shrink-0 uppercase tracking-wide">
              <Cpu className="size-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">Model</span>
            </span>
            <Select value={model} onValueChange={(v) => onModelChange(v ?? '')}>
              <SelectTrigger
                disabled={!provider || modelsLoading}
                className="flex-1 sm:flex-none bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[150px] focus:outline-none focus:border-white/12 focus:bg-[#111118] hover:border-white/10 transition-colors duration-150 shadow-sm"
              >
                <SelectValue placeholder={!provider ? 'Select provider' : modelsLoading ? 'Loading…' : 'Model'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {m.label || m.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold flex-shrink-0 uppercase tracking-wide">
              <KeyRound className="size-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">Key</span>
            </span>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Api Key"
              autoComplete="off"
              className="flex-1 sm:w-36 lg:w-40 bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 focus-visible:outline-none focus-visible:border-white/12 focus-visible:bg-[#111118] placeholder-gray-600 hover:border-white/10 transition-colors duration-150 shadow-sm"
            />
          </div>

          {/* Hint */}
          <span className="text-xs text-gray-500 hidden sm:block flex-shrink-0 ml-auto font-medium">
            Enter to send, Shift + Enter for newline
          </span>
        </div>
      </div>
    </div>
  );
}