import { Container, Image } from './top-bar.styles';
import { Logo } from '../../assets/image-mapping';

export const TopBar = () => {
  return (
    <Container>
      <Image src={Logo} alt='Logo' />
    </Container>
  );
};
