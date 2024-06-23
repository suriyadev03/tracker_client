import { FunctionComponent } from 'react';
import './Loading.css'; // Import CSS file for animations
import {  CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks/useRedux/useAppRedux';

const Loading: FunctionComponent = () => {
    const { isLoading } = useAppSelector(state => state.application)
    return (
        <>{
            isLoading && <div className='loading-container'>
                    <CircularProgress />

            </div>
        }
        </>

    );
}

export default Loading;