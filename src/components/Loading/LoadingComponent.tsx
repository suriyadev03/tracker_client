import { FunctionComponent } from 'react';
import './Loading.css'; // Import CSS file for animations
import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks/useRedux/useAppRedux';

const Loading: FunctionComponent = () => {
    const { isLoading } = useAppSelector(state => state.application)
    return (
        <>{
            isLoading && <div className='loading-container'>
                <Box >
                    <CircularProgress />
                </Box>

            </div>
        }
        </>

    );
}

export default Loading;