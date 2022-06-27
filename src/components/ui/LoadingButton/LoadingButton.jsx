import { ClipLoader } from 'react-spinners';
import { Button } from './LoadingButton.styled';

export const LoadingButton = ({
  error = null,
  isLoading = false,
  text = 'Text',
}) => {
  return (
    <Button type="submit" disabled={error || isLoading}>
      {isLoading ? (
        <>
          {text}
          <ClipLoader
            size={20}
            css={`
              margin-left: 10px;
              border-color: #1976d2;
            `}
          />
        </>
      ) : (
        text
      )}
    </Button>
  );
};
