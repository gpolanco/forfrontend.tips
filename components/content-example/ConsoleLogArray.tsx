import React, { FC, useCallback, useEffect, useState } from 'react'

interface IConsoleLogArrayProps {
  items: number[]
  onRemove?: (items: any) => { returnValue: string; arrayItems: number[] | string[] }
  onRun?: (items: any) => { returnValue: string; arrayItems: number[] | string[] }
  runBtnText?: string
  runCode?: string
}

export const ConsoleLogArray: FC<IConsoleLogArrayProps> = ({
  items,
  onRemove,
  onRun,
  runBtnText = 'Remove item',
  runCode,
}) => {
  const [arrayItems, setArrayItems] = useState<any[]>(items)
  const [returnValue, setReturnValue] = useState<any>(-1)

  useEffect(() => {
    setArrayItems(items)
  }, [items])

  const handleReset = useCallback(() => {
    setArrayItems(items)
    setReturnValue(-1)
  }, [])

  const handleRun = () => {
    if (onRemove) {
      const newArray = onRemove([...arrayItems])

      setReturnValue(newArray.returnValue)
      setArrayItems(newArray.arrayItems)
    } else if (onRun && arrayItems.length === items.length) {
      const newArray = onRun([...arrayItems])
      setReturnValue(newArray.returnValue)
      setArrayItems(newArray.arrayItems)
    }
  }

  return (
    <div className="bg-gray-100 border-l-4 shadow-md pt-6 pb-4 px-4 border-gray-800 grid grid-cols-1 gap-y-2 -mt-7">
      <span className="text-gray-400 my-0 block bg-white col-span-2 p-3 mb-2 shadow-sm">
        {runCode && (
          <>
            {`> ${runCode}`}
            <br />
          </>
        )}
        {returnValue !== -1 && (
          <>
            {`> (${arrayItems.length}) `}
            {JSON.stringify(arrayItems)} <span className="text-gray-300"> // New array value</span>
            <br />
            {`> ${returnValue}`}
            <span className="text-gray-300"> // return value</span>
          </>
        )}
      </span>
      <div className="flex">
        <button
          className="bg-white border-2  border-gray-200 px-2 py-1 mr-2 rounded block disabled:opacity-50 w-1/2 text-gray-400 hover:text-gray-600 hover:border-gray-400"
          onClick={handleRun}
        >
          {runBtnText}
        </button>
        <button
          disabled={arrayItems.length === items.length}
          className="bg-white border-2 border-gray-200 px-2 py-1 rounded block disabled:opacity-50 w-1/2 text-gray-400 hover:text-gray-600 hover:border-gray-400"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
