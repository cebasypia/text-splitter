import React, { useState } from 'react';
import { TextInput } from './components/TextInput';
import { SplitSettings } from './components/SplitSettings';
import { ClearButton } from './components/ClearButton';
import { ChunkList } from './components/ChunkList';
import { useTextSplitter } from './hooks/useTextSplitter';
import { Scissors } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [chunkSize, setChunkSize] = useState(2000);
  const [isSmartSplit, setIsSmartSplit] = useState(true);
  const [delimiters, setDelimiters] = useState(['\n', '。', '.']);

  const { chunks, totalCodePoints } = useTextSplitter(inputText, chunkSize, {
    isSmartSplit,
    delimiters,
  });

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Scissors size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Text Splitter</h1>
          </div>
          <p className="text-gray-600">
            長文をコードポイント単位で指定長に分割し、ワンクリックでコピーできます。
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <div className="md:col-span-3">
                <SplitSettings
                  chunkSize={chunkSize}
                  onChunkSizeChange={setChunkSize}
                  isSmartSplit={isSmartSplit}
                  onSmartSplitChange={setIsSmartSplit}
                  delimiters={delimiters}
                  onDelimitersChange={setDelimiters}
                />
              </div>
              <div className="flex justify-end pt-1">
                <ClearButton onClear={handleClear} />
              </div>
            </div>

            <TextInput
              value={inputText}
              onChange={setInputText}
              count={totalCodePoints}
            />
          </section>

          <section>
            <ChunkList chunks={chunks} />
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Text Splitter. Built for efficiency.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
