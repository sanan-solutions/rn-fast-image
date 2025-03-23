import type { TurboModule } from 'react-native';
import { Source } from './index';
export interface Spec extends TurboModule {
    preload: (sources: Source[]) => void;
    clearMemoryCache: () => Promise<void>;
    clearDiskCache: () => Promise<void>;
}
declare const _default: Spec | null;
export default _default;
