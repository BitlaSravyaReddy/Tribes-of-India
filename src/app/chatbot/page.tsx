
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Languages, Mic, Send, Volume2, User, Bot, ScreenShare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getBotResponse } from '@/libs/ai/flows/translate-user-input';
import { translateText } from '@/libs/ai/flows/translate-text-flow';
import type { LanguageOption} from '@/libs/chatbot/languages';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE, getLanguageOptionFromBcp47, getLanguageOptionFromValue } from '@/libs/chatbot/languages';

interface Message {
  id: string;
  originalText: string;
  originalLang: string; // bcp47 code
  currentText: string;
  currentLang: string; // bcp47 code
  sender: 'user' | 'bot';
}

// Add SpeechRecognition type for TypeScript
type SpeechRecognition = typeof window.webkitSpeechRecognition extends { new (): infer R } ? R : any;

declare global {
  interface Window {
    SpeechRecognition: typeof window.webkitSpeechRecognition | undefined;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognitionInstance = SpeechRecognition;

export default function LinguaTribePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputLanguage, setInputLanguage] = useState<LanguageOption>(DEFAULT_LANGUAGE);
  const [displayLanguage, setDisplayLanguage] = useState<LanguageOption>(DEFAULT_LANGUAGE);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const { toast } = useToast();
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const welcomeOriginalText = `Welcome to LinguaTribe! I can understand ${LANGUAGE_OPTIONS.map(l => l.label.split(" ")[0]).join(', ')}. Select your input and display languages, then let's chat.`;
    const welcomeOriginalLang = DEFAULT_LANGUAGE.bcp47;

    setMessages([
      {
        id: crypto.randomUUID(),
        originalText: welcomeOriginalText,
        originalLang: welcomeOriginalLang,
        currentText: welcomeOriginalText, // Initially same as original
        currentLang: welcomeOriginalLang, // Initially same as original
        sender: 'bot',
      },
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTo({ top: scrollAreaViewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  // Effect to re-translate messages when displayLanguage changes
  useEffect(() => {
    const translateAllMessages = async () => {
      if (messages.length === 0) return;
      setIsTranslating(true);
      const updatedMessages = await Promise.all(
        messages.map(async (msg) => {
          if (msg.originalLang === displayLanguage.bcp47) {
            return { ...msg, currentText: msg.originalText, currentLang: msg.originalLang };
          } else {
            const sourceLangOpt = getLanguageOptionFromBcp47(msg.originalLang);
            if (!sourceLangOpt) {
              console.error("Could not find language value for bcp47:", msg.originalLang);
              return { ...msg, currentText: msg.originalText, currentLang: msg.originalLang }; // Fallback
            }
            try {
              const translationResult = await translateText({
                textToTranslate: msg.originalText,
                sourceLanguage: sourceLangOpt.value,
                targetLanguage: displayLanguage.value,
              });
              return { ...msg, currentText: translationResult.translatedText, currentLang: displayLanguage.bcp47 };
            } catch (e) {
              console.error("Error translating message for display language change:", e);
              toast({ title: "Translation Error", description: `Could not translate a message to ${displayLanguage.label}`, variant: "destructive" });
              return { ...msg, currentText: msg.originalText, currentLang: msg.originalLang }; // Fallback to original
            }
          }
        })
      );
      setMessages(updatedMessages);
      setIsTranslating(false);
    };

    translateAllMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayLanguage]);


  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      interface SpeechRecognitionResult {
        0: SpeechRecognitionAlternative;
        isFinal: boolean;
        length: number;
        [index: number]: SpeechRecognitionAlternative;
      }

      interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
      }

      interface SpeechRecognitionEvent extends Event {
        results: SpeechRecognitionResultList;
      }

      interface SpeechRecognitionResultList {
        length: number;
        item(index: number): SpeechRecognitionResult;
        [index: number]: SpeechRecognitionResult;
      }

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const spokenText: string = event.results[0][0].transcript;
        setInputValue(spokenText);
        // Automatically send message after voice input
        const currentInputLanguage: LanguageOption =
          LANGUAGE_OPTIONS.find(l => l.bcp47 === recognitionRef.current?.lang) || inputLanguage;
        handleSendMessageInternal(spokenText, currentInputLanguage);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({ title: 'Voice Error', description: `Could not recognize speech: ${event.error}`, variant: 'destructive' });
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

    } else {
      if (!recognitionRef.current && !toastTimeouts.has("voiceNotSupported")) { // Avoid repeated toasts
         toast({ title: 'Voice Input Not Supported', description: 'Your browser does not support voice input.', variant: 'destructive' });
         toastTimeouts.set("voiceNotSupported", setTimeout(() => toastTimeouts.delete("voiceNotSupported"), 5000));
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputLanguage]); // Re-init if input language changes for speech rec lang property
  const toastTimeouts = new Map<string, NodeJS.Timeout>();


  const handleInputLanguageChange = (value: string) => {
    const language = getLanguageOptionFromValue(value) || DEFAULT_LANGUAGE;
    setInputLanguage(language);
    toast({ title: 'Input Language Changed', description: `Input/Bot language set to ${language.label}` });
  };

  const handleDisplayLanguageChange = (value: string) => {
    const language = getLanguageOptionFromValue(value) || DEFAULT_LANGUAGE;
    setDisplayLanguage(language);
    toast({ title: 'Display Language Changed', description: `Screen display language set to ${language.label}` });
  };

  const handleFormSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessageInternal(inputValue, inputLanguage);
  };
  
  const handleSendMessageInternal = async (text: string, currentInputLang: LanguageOption) => {
    const userOriginalText = text;
    const userOriginalLangBcp47 = currentInputLang.bcp47;

    setInputValue(''); // Clear input after grabbing value

    // Create user message object (original)
    const userMessageOriginal: Omit<Message, 'currentText' | 'currentLang'> = {
      id: crypto.randomUUID(),
      originalText: userOriginalText,
      originalLang: userOriginalLangBcp47,
      sender: 'user',
    };

    // Translate user message for display if needed
    let userCurrentText = userOriginalText;
    let userCurrentLang = userOriginalLangBcp47;

    if (userOriginalLangBcp47 !== displayLanguage.bcp47) {
      setIsTranslating(true);
      try {
        const translationResult = await translateText({
          textToTranslate: userOriginalText,
          sourceLanguage: currentInputLang.value,
          targetLanguage: displayLanguage.value,
        });
        userCurrentText = translationResult.translatedText;
        userCurrentLang = displayLanguage.bcp47;
      } catch (e) {
        console.error("Error translating user message for display:", e);
        toast({ title: "Translation Error", description: `Could not translate your message to ${displayLanguage.label}`, variant: "destructive" });
        // Fallback: currentText remains originalText
      }
      setIsTranslating(false);
    }
    
    const userDisplayMessage: Message = {
      ...userMessageOriginal,
      currentText: userCurrentText,
      currentLang: userCurrentLang,
    };
    setMessages(prev => [...prev, userDisplayMessage]);
    setIsBotLoading(true);

    try {
      const response = await getBotResponse({
        userInput: userOriginalText, // Send original text to bot
        userLanguage: currentInputLang.value, 
      });
      
      const botOriginalText = response.botResponse;
      const botOriginalLangBcp47 = currentInputLang.bcp47; // Bot responds in inputLanguage

      const botMessageOriginal: Omit<Message, 'currentText' | 'currentLang'> = {
        id: crypto.randomUUID(),
        originalText: botOriginalText,
        originalLang: botOriginalLangBcp47,
        sender: 'bot',
      };

      // Translate bot message for display if needed
      let botCurrentText = botOriginalText;
      let botCurrentLang = botOriginalLangBcp47;

      if (botOriginalLangBcp47 !== displayLanguage.bcp47) {
        setIsTranslating(true);
        try {
          const translationResult = await translateText({
            textToTranslate: botOriginalText,
            sourceLanguage: currentInputLang.value,
            targetLanguage: displayLanguage.value,
          });
          botCurrentText = translationResult.translatedText;
          botCurrentLang = displayLanguage.bcp47;
        } catch (e) {
          console.error("Error translating bot message for display:", e);
          toast({ title: "Translation Error", description: `Could not translate bot's message to ${displayLanguage.label}`, variant: "destructive" });
          // Fallback
        }
        setIsTranslating(false);
      }

      const botDisplayMessage: Message = {
        ...botMessageOriginal,
        currentText: botCurrentText,
        currentLang: botCurrentLang,
      };
      setMessages(prev => [...prev, botDisplayMessage]);

    } catch (error) {
      console.error('Error calling AI:', error);
      const errorOriginalText = 'Sorry, I encountered an error. Please try again.';
      // Error message is in English, its originalLang should reflect that.
      const errorOriginalLangBcp47 = DEFAULT_LANGUAGE.bcp47;
      let errorCurrentText = errorOriginalText;
      let errorCurrentLang = errorOriginalLangBcp47;

      if (errorOriginalLangBcp47 !== displayLanguage.bcp47) {
         // Attempt to translate error message, best effort
        try {
            const translatedError = await translateText({
                textToTranslate: errorOriginalText,
                sourceLanguage: DEFAULT_LANGUAGE.value, // Assuming error messages are defined in English
                targetLanguage: displayLanguage.value,
            });
            errorCurrentText = translatedError.translatedText;
            errorCurrentLang = displayLanguage.bcp47;
        } catch (e) {
            // If translation fails, use original English error
        }
      }
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        originalText: errorOriginalText,
        originalLang: errorOriginalLangBcp47,
        currentText: errorCurrentText,
        currentLang: errorCurrentLang,
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({ title: 'AI Error', description: 'Could not get response from AI.', variant: 'destructive' });
    } finally {
      setIsBotLoading(false);
    }
  }

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      toast({ title: 'Voice Input Not Ready', description: 'Speech recognition is not available.', variant: 'destructive' });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = inputLanguage.bcp47; // Use inputLanguage for speech recognition
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({ title: 'Listening...', description: `Speak in ${inputLanguage.label}`});
      } catch(e) {
        console.error("Error starting speech recognition:", e);
        toast({ title: 'Voice Error', description: 'Could not start voice input. Check microphone permissions.', variant: 'destructive' });
        setIsListening(false);
      }
    }
  };
  
  const isLoading = isBotLoading || isTranslating;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <header className="p-4 border-b shadow-sm flex flex-col md:flex-row justify-between items-center sticky top-0 bg-background z-10 gap-4 md:gap-2">
        <div className="flex items-center space-x-2">
          <Volume2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">LinguaTribe</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Languages className="h-5 w-5 text-muted-foreground" />
            <Select value={inputLanguage.value} onValueChange={handleInputLanguageChange}>
              <SelectTrigger className="w-auto min-w-[150px] md:w-[180px] rounded-md shadow-sm">
                <SelectValue placeholder="Input Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label} (Input)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <ScreenShare className="h-5 w-5 text-muted-foreground" /> {/* Icon for display language */}
            <Select value={displayLanguage.value} onValueChange={handleDisplayLanguageChange}>
              <SelectTrigger className="w-auto min-w-[150px] md:w-[180px] rounded-md shadow-sm">
                <SelectValue placeholder="Display Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label} (Display)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div ref={scrollAreaViewportRef} className="p-4 md:p-6 space-y-6">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-end space-x-2 md:space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8 shadow">
                  <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot size={18}/></AvatarFallback>
                </Avatar>
              )}
              <Card 
                className={`max-w-[70%] md:max-w-[60%] shadow-md rounded-xl ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-card text-card-foreground rounded-bl-none border-border'
              }`}
              >
                <CardContent className="p-3">
                  <p lang={msg.currentLang} className="text-sm whitespace-pre-wrap break-words">
                    {msg.currentText}
                  </p>
                </CardContent>
              </Card>
              {msg.sender === 'user' && (
                 <Avatar className="h-8 w-8 shadow">
                  <AvatarFallback className="bg-accent text-accent-foreground"><User size={18}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end space-x-2 md:space-x-3 justify-start">
               {messages[messages.length -1]?.sender === 'user' &&  ( // Show loading indicator only after user message if bot is loading
                <>
                  <Avatar className="h-8 w-8 shadow">
                    <AvatarFallback className="bg-secondary text-secondary-foreground"><Bot size={18}/></AvatarFallback>
                  </Avatar>
                  <Card className="max-w-[70%] md:max-w-[60%] shadow-md rounded-xl bg-card text-card-foreground rounded-bl-none border-border">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-300"></div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t bg-background sticky bottom-0">
        <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
          <Textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={`Type in ${inputLanguage.label}...`}
            className="flex-1 resize-none rounded-lg shadow-sm focus:ring-2 focus:ring-primary text-sm md:text-base"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit();
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={toggleVoiceListening}
            className="rounded-full shadow-sm hover:bg-accent/10 aspect-square"
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            disabled={isLoading}
          >
            <Mic className={`h-5 w-5 ${isListening ? "text-destructive-foreground" : "text-accent"}`} />
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            className="bg-primary hover:bg-primary/90 rounded-full shadow-sm aspect-square" 
            disabled={isLoading || !inputValue.trim()} 
            aria-label="Send message">
            <Send className="h-5 w-5 text-primary-foreground" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
