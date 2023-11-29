import { renderHook, act } from '@testing-library/react-hooks'
import useCountdownTimer from './useCountdownTimer'

describe('useCountdownTimer', () => {
  it('should start with initial time', () => {
    const { result } = renderHook(() => useCountdownTimer(10, jest.fn()))
    expect(result.current.timeRemaining).toBe(10)
  })

  it('should decrement timeRemaining after one second', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useCountdownTimer(10, jest.fn()))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.timeRemaining).toBe(9)

    jest.useRealTimers()
  })

  it('should reset timeRemaining', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useCountdownTimer(10, jest.fn()))

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(result.current.timeRemaining).toBe(5)

    act(() => {
      result.current.resetTimer()
    })

    expect(result.current.timeRemaining).toBe(10)

    jest.useRealTimers()
  })

  it('should call onTimeout when time runs out', () => {
    jest.useFakeTimers()

    const onTimeoutMock = jest.fn()
    renderHook(() => useCountdownTimer(2, onTimeoutMock))

    act(() => {
      jest.advanceTimersByTime(2100)
    })

    expect(onTimeoutMock).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
