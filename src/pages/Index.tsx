
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FormatCard from '@/components/FormatCard';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [formattedResults, setFormattedResults] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      toast({
        title: "Text required",
        description: "Please enter some text to format",
        variant: "destructive"
      });
      return;
    }
    
    // Create 6 distinctly different formatted versions
    setFormattedResults([
      // Bold formatting with custom prefix
      `🔵 **${inputText.toUpperCase()}** 🔵`,
      
      // Aesthetic format with special characters
      `✧･ﾟ: *✧･ﾟ:* ${inputText} *:･ﾟ✧*:･ﾟ✧`,
      
      // Code block style
      `\`\`\`\n${inputText}\n\`\`\``,
      
      // Spaced out with arrows
      `→ ${inputText.split('').join(' ')} ←`,
      
      // Quoted with emoji decoration
      `💬 "${inputText}" 💬`,
      
      // Reverse text
      inputText.split('').reverse().join('')
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Text Formatter</h1>
        
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle>Enter your text</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Textarea 
                placeholder="Type or paste your text here..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32 mb-4"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Formats
              </Button>
            </form>
          </CardContent>
        </Card>

        {formattedResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormatCard 
              title="Bold Highlight" 
              text={formattedResults[0]} 
              description="Uppercase with bold emphasis and blue dots"
            />
            <FormatCard 
              title="Aesthetic Stars" 
              text={formattedResults[1]} 
              description="Decorative star pattern formatting"
            />
            <FormatCard 
              title="Code Block" 
              text={formattedResults[2]} 
              description="Formatted as a code snippet"
            />
            <FormatCard 
              title="Spaced Arrows" 
              text={formattedResults[3]} 
              description="Letters spaced with arrow indicators"
            />
            <FormatCard 
              title="Quote Style" 
              text={formattedResults[4]} 
              description="Text as a quoted message with speech bubbles"
            />
            <FormatCard 
              title="Reversed" 
              text={formattedResults[5]} 
              description="Text completely reversed"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
