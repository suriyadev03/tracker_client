import { FunctionComponent } from 'react';
import { useAppSelector } from '../../hooks/useRedux/useAppRedux';
import { Backdrop } from '@mui/material';

const Loading: FunctionComponent = () => {
    const { isLoading } = useAppSelector(state => state.application)
    return (
        <>{
            isLoading && <Backdrop
            sx={{ color: 'yellow', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <div className='loader'></div>
          </Backdrop>
        }
        </>

    );
}

export default Loading;