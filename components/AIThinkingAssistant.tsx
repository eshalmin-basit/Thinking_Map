import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Brain } from "lucide-react";
import dynamic from 'next/dynamic';
import MarkmapHooks from '@/components/MarkMapHooks'; // Import the Markmap component

export default function AIThinkingAssistant() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState(''); // Text response from GPT-4
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.content); // This will be the markdown content for Markmap and the GPT-4 text content
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-purple-900 overflow-hidden">
      <div className="flex-1 overflow-auto p-8">
        {/* Input Form */}
        <Card>
          <CardContent className="bg-gray-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your problem or concept to visualize"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-6 w-6" /> Generate Mind Map
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Handling */}
        {error && <div className="bg-red-500 p-4 mt-8">{error}</div>}

        {/* Display Generated GPT-4 Content */}
        {generatedContent && (
          <Card className="mt-8 overflow-hidden rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <CardContent className="bg-gray-800 p-6">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                GPT-4 Generated Content
              </h3>
              {/* Display the generated text response */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-gray-300">{generatedContent}</pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Display Mind Map Visualization */}
        {generatedContent && (
          <Card className="mt-8 overflow-hidden rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <CardContent className="bg-gray-800 p-6">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                Mind Map Visualization
              </h3>
              <div className="bg-white p-4 rounded-lg">
              
                {/* Pass the generated content to MarkmapHooks */}
                <MarkmapHooks content={generatedContent} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
