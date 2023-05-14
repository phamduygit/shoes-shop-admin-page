import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';

export default function LinearBuffer() {
  const isFinish = useSelector((state) => state.loading.isFinish);
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(100);
  const [buffer, setBuffer] = React.useState(0);

  const progressRef = React.useRef(() => {});
  const timer = React.useRef();

  // Start loading
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        // reset timer
        clearInterval(timer.current);
        dispatch({
          type: 'END_LOADING',
          payload: true,
        });
      } else {
        const diff = Math.random() * (isFinish ? 100 : 10);
        const diff2 = Math.random() * (isFinish ? 100 : 10);
        setProgress(progress + + diff + diff2);
        setBuffer(progress + diff + diff2 + 10);
      }
    };
  });

  React.useEffect(() => {
    if (!isFinish) {
      setProgress(0)
      setBuffer(10)
      timer.current = setInterval(() => {
        progressRef.current();
      }, 500);
    }
  }, [isFinish])

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      {(progress >= 100) ? null : <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />}
    </Box>
  );
}
