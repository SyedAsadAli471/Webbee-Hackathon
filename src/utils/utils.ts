import {ViewStyle} from 'react-native';
import dayjs from 'dayjs';

export const shadowStyleProps: ViewStyle = {
  shadowColor: '#000000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
};

export const formatDate = (
  date?: string,
  outputFormat: string = 'DD MMM YYYY',
  inputFormat?: string,
) => {
  if (inputFormat) {
    return dayjs(dayjs(date).format(inputFormat)).format(outputFormat);
  }
  return dayjs(date).format(outputFormat);
};
