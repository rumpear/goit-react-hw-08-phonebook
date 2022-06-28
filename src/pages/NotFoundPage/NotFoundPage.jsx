import { Section } from '../../components/ui/Section';
import { Text, ToMainLink } from './NotFoundPage.styled';

export const NotFoundPage = () => {
  return (
    <Section>
      <Text>
        Page not found.{' '}
        {<ToMainLink to={'/'}>You can return to the main</ToMainLink>}
      </Text>
    </Section>
  );
};
