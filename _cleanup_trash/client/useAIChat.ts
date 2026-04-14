// File: client/src/hooks/useAIChat.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAIProviders, getAIModels, generateAIChat } from '@/lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isSuccess?: boolean;
}

export interface ProviderOption {
  id: string;
  label: string;
  description?: string;
}

export interface ModelOption {
  id: string;
  label: string;
}

const LS_PROVIDER = 'fm_ai_provider';
const LS_MODEL    = 'fm_ai_model';
const LS_APIKEY   = 'fm_ai_apikey';

function readLS(key: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(key) ?? '';
}

export function useAIChat() {
  const [providers, setProviders]   = useState<ProviderOption[]>([]);
  const [models, setModels]         = useState<ModelOption[]>([]);
  const [provider, setProviderRaw]  = useState<string>('');
  const [model, setModelRaw]        = useState<string>('');
  const [apiKey, setApiKeyRaw]      = useState<string>('');
  const [prompt, setPrompt]         = useState<string>('');
  const [messages, setMessages]     = useState<ChatMessage[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [modelsLoading, setModelsLoading]       = useState(false);

  // ── Restore from localStorage on first mount ──────────────────────────────
  useEffect(() => {
    const savedProvider = readLS(LS_PROVIDER);
    const savedModel    = readLS(LS_MODEL);
    const savedApiKey   = readLS(LS_APIKEY);
    if (savedProvider) setProviderRaw(savedProvider);
    if (savedModel)    setModelRaw(savedModel);
    if (savedApiKey)   setApiKeyRaw(savedApiKey);
  }, []);

  // ── Persist to localStorage whenever values change ────────────────────────
  const setProvider = useCallback((val: string) => {
    setProviderRaw(val);
    setModelRaw('');                        // reset model when provider changes
    localStorage.setItem(LS_PROVIDER, val);
    localStorage.removeItem(LS_MODEL);
  }, []);

  const setModel = useCallback((val: string) => {
    setModelRaw(val);
    localStorage.setItem(LS_MODEL, val);
  }, []);

  const setApiKey = useCallback((val: string) => {
    setApiKeyRaw(val);
    localStorage.setItem(LS_APIKEY, val);
  }, []);

  // ── Fetch providers on mount ──────────────────────────────────────────────
  useEffect(() => {
    setProvidersLoading(true);
    getAIProviders()
      .then((res) => {
        // res.data can be an array of {id, label} or a string[] or an object
        const raw = res?.data ?? [];
        let list: ProviderOption[] = [];
        if (Array.isArray(raw)) {
          list = raw.map((p: any) =>
            typeof p === 'string' ? { id: p, label: p } : p,
          );
        } else if (typeof raw === 'object') {
          list = Object.keys(raw).map((k) => ({ id: k, label: k }));
        }
        setProviders(list);
      })
      .catch((e) => console.error('[useAIChat] Failed to load providers:', e))
      .finally(() => setProvidersLoading(false));
  }, []);

  // ── Fetch models whenever provider changes ────────────────────────────────
  useEffect(() => {
    if (!provider) { setModels([]); return; }
    setModelsLoading(true);
    getAIModels(provider)
      .then((res) => {
        const raw = res?.data ?? [];
        let list: ModelOption[] = [];
        if (Array.isArray(raw)) {
          list = raw.map((m: any) =>
            typeof m === 'string' ? { id: m, label: m } : m,
          );
        }
        setModels(list);

        // If previously persisted model belongs to this provider, keep it
        const saved = readLS(LS_MODEL);
        if (saved && list.some((m) => m.id === saved)) {
          setModelRaw(saved);
        }
      })
      .catch((e) => console.error('[useAIChat] Failed to load models:', e))
      .finally(() => setModelsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  // ── Generate ──────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (!provider || !model || !apiKey || !prompt.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);
    setError(null);

    try {
      const res = await generateAIChat({ prompt: userMsg.content, provider, model, apiKey });
      console.log('[FlatMotion AI Response]', res);

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Generation successful. Check console for the response.',
        timestamp: new Date(),
        isSuccess: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err.message || 'Failed to generate. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, [provider, model, apiKey, prompt]);

  const canGenerate = Boolean(provider && model && apiKey && prompt.trim() && !loading);

  return {
    // provider/model/key state
    providers, providersLoading,
    models,    modelsLoading,
    provider, setProvider,
    model,    setModel,
    apiKey,   setApiKey,
    // prompt & chat
    prompt, setPrompt,
    messages,
    // status
    loading, error, canGenerate,
    generate,
  };
}
