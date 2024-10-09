import { useRegularExpressionHook } from './regular-expression.hook';
import { RegularExpressionLayout } from './regular-expression.layout';

export const RegularExpression = () => {
  const properties = useRegularExpressionHook();

  return <RegularExpressionLayout {...properties} />;
};
