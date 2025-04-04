import {
  Abc,
  CallSplit,
  ContentCut,
  Download,
  DragIndicator,
  FileUpload,
  FontDownload,
  FontDownloadOff,
  NearMe,
  SettingsEthernet,
  SouthEast,
  SouthWest,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { useThemeSettings } from '../../hooks';

type TProps = {
  handleClick: (value: { target: { name: string } }) => void;
  cutButton: boolean;
  disabled: boolean;
  splitButton: boolean;
};

const EditorButtons = ({
  handleClick,
  cutButton,
  disabled,
  splitButton,
}: TProps) => {
  const actionButtons = [
    {
      name: 'cursor',
      icon: <NearMe />,
    },
    {
      name: 'shift',
      icon: <SettingsEthernet />,
    },
    {
      name: 'region',
      icon: (
        <DragIndicator
          sx={{
            rotate: '90deg',
          }}
        />
      ),
    },

    // { name: 'trim', icon: '' },
    {
      name: 'cut',
      icon: <ContentCut />,
    },
    {
      name: 'split',
      icon: <CallSplit />,
    },
    {
      name: 'fadein',
      icon: <SouthWest />,
    },
    {
      name: 'fadeout',
      icon: <SouthEast />,
    },
    {
      name: 'zoomin',
      icon: <ZoomIn />,
    },
    {
      name: 'zoomout',
      icon: <ZoomOut />,
    },

    // {
    //   name: 'saveToCloudStorage',
    //   icon: (
    //     <CloudUpload
    //
    //     />
    //   ),
    // },
    // "LoadFromStorage",
    // "uploadToCloudStorage",
    {
      name: 'upload',
      icon: <FileUpload />,
    },
    {
      name: 'download',
      icon: <Download />,
    },
  ];

  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      flexWrap={'wrap'}
      gap={1}
      mb={2}
      flexGrow={1}
    >
      {actionButtons.map((button, index) => {
        const { name, icon } = button;
        let toBeDisabled = disabled;
        if (name === 'upload') {
          toBeDisabled = false;
        }
        if (name === 'cut') {
          toBeDisabled = cutButton;
        }
        if (name === 'split') {
          if (disabled) {
            return;
          }
          toBeDisabled = splitButton;
        }
        return (
          <Tooltip title={name} key={index}>
            <span>
              <Button
                disabled={toBeDisabled}
                name={name}
                variant="text"
                onClick={() => {
                  handleClick({ target: { name } });
                }}
                color={'info'}
                sx={{
                  ':hover': {
                    transform: 'scale(1.2)',
                    outline: `1px solid ${
                      '#0088d1' 
                    }`,
                  },

                  transition: '0.25s',
                }}
              >
              </Button>
            </span>
          </Tooltip>
        );
      })}
    </Stack>
  );
};

export default EditorButtons;
