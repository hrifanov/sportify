import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { AlertFinishMatch } from 'src/modules/matches/molecules/AlertFinishMatch';

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
    <ComponentPreview
      path='/AlertFinishMatch'>
      <AlertFinishMatch />
    </ComponentPreview>
  </Previews>;
};

export default ComponentPreviews;
