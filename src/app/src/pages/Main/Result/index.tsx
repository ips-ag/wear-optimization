import { resultSelector } from '@/store';
import { useAtom } from 'jotai';

export default function ResultPage() {
  const detectResult = useAtom(resultSelector)[0];

  return (
    <div>
      {detectResult ? (
        <div>
          <h1>Result</h1>
          <pre>{JSON.stringify(detectResult, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
