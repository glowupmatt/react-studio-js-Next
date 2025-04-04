import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  InputBase,
  Tooltip,
  Button,
  IconButton,
} from '@mui/material';
import ModeSwitch from './ModeSwitch';
import { useThemeSettings } from '../hooks';
import { dark, light } from '../theme';
import { Bars, ColorRing } from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';
import { GitHub } from '@mui/icons-material';

export default function NavBAr() {
  type TAnnotation = {
    begin: string;
    end: string;
    id: string;
    language: string;
    lines: string[];
  };

  const {

    event_Emitter,


  } = useThemeSettings();

  const [loading, setLoading] = React.useState(false);

  async function showDemo() {
    setLoading(() => true);
    event_Emitter.emit('clear');
    try {
      const track =
        'https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/originals/BAD_BUNNY_-_BAILE_INoLVIDABLE_Video_Oficial_DeBI_TiRAR_MaS_FOToS.mp3';
      const response = await fetch(track);
      const data = await response.blob();

      const blob = new Blob([data], {
        type: 'audio/wav',
      });

      event_Emitter.emit('newtrack', {
        src: blob,
        name: 'Demo',
        id: uuidv4(),
        url: true,
      });

      setLoading(() => false);
    } catch (err) {
      if (err instanceof Error) {
        let error: Error = err;
        console.log(error.message);
      } else {
        console.log('An unknown error occurred:', err);
      }
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'start'}
            gap={0.5}
          >
            {/* <img src={wave} style={{ width: '40px' }} /> */}
            <Bars
              height="80"
              width="80"
              color="#9c27b0"
              ariaLabel="bars-loading"
              visible={true}
            />
          </Stack>
          <Stack
            flexGrow={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
          </Stack>

          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#1860aa', '#1860aa', '#1860aa', '#1860aa', '#1860aa']}
            />
          ) : (
            <Button onClick={showDemo}>Load Demo</Button>
          )}
    </Box>
  );
}
