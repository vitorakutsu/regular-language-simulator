import { Container, Image, Text } from './top-bar.styles';
import { Logo } from '../../assets/image-mapping';

export const TopBar = () => {
  return (
    <Container>
      <Image src={Logo} alt='Logo' />
      <Text>Simulador de Linguagens Regulares</Text>
    </Container>
  );
};
