import { HTMLInputTypeAttribute } from 'react'
import { FieldValues, Control, Controller, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  label: string
  id: Path<T>
  type: HTMLInputTypeAttribute
  placeholder: string
  error?: string
  control: Control<T>
}

const Input = <T extends FieldValues>({
  label,
  id,
  type,
  placeholder,
  error,
  control,
}: InputProps<T>) => (
  <div className="flex flex-col justify-center w-full">
    <label htmlFor={id} className="flex flex-col text-black">
      <span className="text-white font-bold mb-1 text-sm">
        {label}
      </span>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <div className='flex justify-between relative'>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              {...field}
              className={`w-full bg-[#222] h-6 rounded px-2 py-5 text-white placeholder:text-sm text-sm placeholder:text-[#999999] border border-black focus:bg-none ${
                error ? 'border-white' : ''
              }`}
            />
          </div>
        )}
      />
      <span className="text-[#999999] text-sm h-4 mt-1">
        {error ? error : '\u00A0'}
      </span>
    </label>
  </div>
)

export default Input