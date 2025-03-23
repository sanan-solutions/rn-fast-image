import React, { forwardRef, memo } from 'react';
import { View, Image, NativeModules, StyleSheet, Platform, requireNativeComponent, } from 'react-native';
const isFabricEnabled = global?.nativeFabricUIManager != null;
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const FastImageViewModule = isTurboModuleEnabled
    ? require('./NativeFastImageView').default
    : NativeModules.FastImageView;
const FastImageView = isFabricEnabled
    ? require('./FastImageViewNativeComponent').default
    : requireNativeComponent('FastImageView');
const resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
};
const priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
};
const cacheControl = {
    // Ignore headers, use uri as cache key, fetch only if not in cache.
    immutable: 'immutable',
    // Respect http headers, no aggressive caching.
    web: 'web',
    // Only load from cache.
    cacheOnly: 'cacheOnly',
};
const resolveDefaultSource = (defaultSource) => {
    if (!defaultSource) {
        return null;
    }
    if (Platform.OS === 'android') {
        // Android receives a URI string, and resolves into a Drawable using RN's methods.
        const resolved = Image.resolveAssetSource(defaultSource);
        if (resolved) {
            return resolved.uri;
        }
        return null;
    }
    // iOS or other number mapped assets
    // In iOS the number is passed, and bridged automatically into a UIImage
    return defaultSource;
};
function FastImageBase({ source, defaultSource, tintColor, onLoadStart, onProgress, onLoad, onError, onLoadEnd, style, fallback, children, resizeMode = 'cover', forwardedRef, ...props }) {
    if (fallback) {
        const cleanedSource = { ...source };
        delete cleanedSource.cache;
        const resolvedSource = Image.resolveAssetSource(cleanedSource);
        return (React.createElement(View, { style: [styles.imageContainer, style], ref: forwardedRef },
            React.createElement(Image, { ...props, style: [StyleSheet.absoluteFill, { tintColor }], source: resolvedSource, defaultSource: defaultSource, onLoadStart: onLoadStart, onProgress: onProgress, onLoad: onLoad, onError: onError, onLoadEnd: onLoadEnd, resizeMode: resizeMode }),
            children));
    }
    // @ts-ignore non-typed property
    const FABRIC_ENABLED = !!global?.nativeFabricUIManager;
    // this type differs based on the `source` prop passed
    const resolvedSource = Image.resolveAssetSource(source);
    if (resolvedSource?.headers &&
        (FABRIC_ENABLED || Platform.OS === 'android')) {
        // we do it like that to trick codegen
        const headersArray = [];
        Object.keys(resolvedSource.headers).forEach((key) => {
            headersArray.push({ name: key, value: resolvedSource.headers[key] });
        });
        resolvedSource.headers = headersArray;
    }
    const resolvedDefaultSource = resolveDefaultSource(defaultSource);
    const resolvedDefaultSourceAsString = resolvedDefaultSource !== null ? String(resolvedDefaultSource) : null;
    return (React.createElement(View, { style: [styles.imageContainer, style], ref: forwardedRef },
        React.createElement(FastImageView, { ...props, tintColor: tintColor, style: StyleSheet.absoluteFill, source: resolvedSource, defaultSource: resolvedDefaultSourceAsString, onFastImageLoadStart: onLoadStart, onFastImageProgress: onProgress, onFastImageLoad: onLoad, onFastImageError: onError, onFastImageLoadEnd: onLoadEnd, resizeMode: resizeMode }),
        children));
}
const FastImageMemo = memo(FastImageBase);
const FastImageComponent = forwardRef((props, ref) => (React.createElement(FastImageMemo, { forwardedRef: ref, ...props })));
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;
FastImage.preload = (sources) => FastImageViewModule.preload(sources);
FastImage.clearMemoryCache = () => FastImageViewModule.clearMemoryCache();
FastImage.clearDiskCache = () => FastImageViewModule.clearDiskCache();
const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
    },
});
export default FastImage;
