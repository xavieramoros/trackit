import renderer from "react-test-renderer";
import { render, fireEvent, act } from '@testing-library/react-native';

import Counter from '../Counter';

let mockedProps;
const initialTimestamp = Date.now() - 5000;

describe(`Counter `, () => {
  it('renders the initial state correctly', () => {
    const { getByText, queryByText, queryByTestId } = render(
      <Counter />
    );

    expect(queryByTestId('play')).not.toBeNull();
    expect(queryByText(/00:00:00/i)).not.toBeNull();
    expect(queryByTestId('pause')).toBeNull();
    expect(queryByTestId('stop')).toBeNull();
  });

  it('renders the play button and triggers onPlay callback when pressed', () => {
    const onPlayMock = jest.fn();
    const { getByTestId } = render(<Counter onPlay={onPlayMock} />);

    act(() => {
      fireEvent.press(getByTestId('play'));
      jest.advanceTimersByTime(1000);
    });


    expect(onPlayMock).toHaveBeenCalledTimes(1);
    expect(getByTestId('pause')).not.toBeNull();
    expect(getByTestId('stop')).not.toBeNull();
  });

  it('pauses the counter when the pause button is pressed', async () => {
    const onPauseMock = jest.fn();
    const { getByTestId } = render(
      <Counter onPause={onPauseMock} initialTimestamp={initialTimestamp} initialState="playing" />
    );

    act(() => {
      fireEvent.press(getByTestId('pause'));
    });

    expect(onPauseMock).toHaveBeenCalledWith({ state: 'paused', count: 5 });
    expect(getByTestId('play')).not.toBeNull();
    expect(getByTestId('stop')).not.toBeNull();
  });

  it('stops the counter when the stop button is pressed', async () => {
    jest.useFakeTimers();
    const onStopMock = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Counter onStop={onStopMock} initialTimestamp={initialTimestamp} initialState="playing" />
    );

    act(() => {
      fireEvent.press(getByTestId('stop'));
      jest.advanceTimersByTime(1000);
    });

    expect(onStopMock).toHaveBeenCalledWith({ state: 'initial', count: 5 });
    expect(queryByTestId('play')).not.toBeNull();
    expect(queryByTestId('pause')).toBeNull();
    expect(queryByTestId('stop')).toBeNull();
  });
});
