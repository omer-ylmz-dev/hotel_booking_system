import { boardTypes } from '../../../data/mockData';
import type { BoardTypeCode } from '../../../types/booking';

interface BoardTypeSelectionProps {
  boardType: BoardTypeCode;
  onChange: (boardType: BoardTypeCode) => void;
}

export default function BoardTypeSelection({ boardType, onChange }: BoardTypeSelectionProps) {
  return (
    <fieldset>
      <legend className="block text-xs font-medium text-gray-700 mb-2">Board Type Selection</legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {boardTypes.map((b) => (
          <label
            key={b.code}
            className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
              boardType === b.code
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="boardType"
              value={b.code}
              checked={boardType === b.code}
              onChange={() => onChange(b.code)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
            />
            <span className="text-xs">{b.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
