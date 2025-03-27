import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'
import type { ViewProps, ColorValue } from 'react-native'
import type {
    Float,
    WithDefault,
    BubblingEventHandler,
    Int32,
} from 'react-native/Libraries/Types/CodegenTypes'

type Headers = ReadonlyArray<Readonly<{ name: string; value: string }>>
type Priority = WithDefault<'low' | 'normal' | 'high', 'normal'>
type CacheControl = WithDefault<'immutable' | 'web' | 'cacheOnly', 'web'>
type CacheStorage = WithDefault<'all' | 'diskOnly' | 'memoryOnly' | 'none', 'all'>
type ThumbnailSizeType = WithDefault<'custom' | 'maxSize'|'matchViewSize', 'maxSize'>

type FastImageSource = Readonly<{
    uri?: string
    headers?: Headers
    priority?: Priority
    cache?: CacheControl
    cacheStorage?:CacheStorage
    thumbnailSizeType?:ThumbnailSizeType
    thumbnailSize?: {
        width: number;
        height: number;
    }
}>

type OnLoadEvent = Readonly<{
    width: Float
    height: Float
}>

type OnProgressEvent = Readonly<{
    loaded: Int32
    total: Int32
}>

interface NativeProps extends ViewProps {
    onFastImageError?: BubblingEventHandler<Readonly<{}>>
    onFastImageLoad?: BubblingEventHandler<OnLoadEvent>
    onFastImageLoadEnd?: BubblingEventHandler<Readonly<{}>>
    onFastImageLoadStart?: BubblingEventHandler<Readonly<{}>>
    onFastImageProgress?: BubblingEventHandler<OnProgressEvent>
    source?: FastImageSource
    defaultSource?: string | null
    resizeMode?: WithDefault<
        'contain' | 'cover' | 'stretch' | 'center',
        'cover'
    >
    tintColor?: ColorValue
}

export default codegenNativeComponent<NativeProps>('FastImageView')
