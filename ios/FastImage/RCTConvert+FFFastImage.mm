#import "RCTConvert+FFFastImage.h"
#import "FFFastImageSource.h"

@implementation RCTConvert (FFFastImage)

RCT_ENUM_CONVERTER(FFFPriority, (@{
                                   @"low": @(FFFPriorityLow),
                                   @"normal": @(FFFPriorityNormal),
                                   @"high": @(FFFPriorityHigh),
                                   }), FFFPriorityNormal, integerValue);

RCT_ENUM_CONVERTER(FFFCacheControl, (@{
                                       @"immutable": @(FFFCacheControlImmutable),
                                       @"web": @(FFFCacheControlWeb),
                                       @"cacheOnly": @(FFFCacheControlCacheOnly),
                                       }), FFFCacheControlImmutable, integerValue);

RCT_ENUM_CONVERTER(FFFCacheStorage, (@{
                                       @"none": @(FFFCacheStorageNone),
                                       @"memoryOnly": @(FFFCacheStorageMemoryOnly),
                                       @"diskOnly": @(FFFCacheStorageDiskOnly),
                                       @"all": @(FFFCacheStorageAll),
                                       }), FFFCacheStorageAll, integerValue);

RCT_ENUM_CONVERTER(FFFImageThumbnailSize, (@{
                                       @"maxSize": @(FFFImageThumbnailMaxSize),
                                       @"matchViewSize": @(FFFImageThumbnailMatchViewSize),
                                       @"custom": @(FFFImageThumbnailCustomSize),
                                       }), FFFImageThumbnailMaxSize, integerValue);

+ (FFFastImageSource *)FFFastImageSource:(id)json {
    if (!json) {
        return nil;
    }
    
    NSString *uriString = json[@"uri"];
    NSURL *uri = [self NSURL:uriString];
    
    FFFPriority priority = [self FFFPriority:json[@"priority"]];
    FFFCacheControl cacheControl = [self FFFCacheControl:json[@"cache"]];
    FFFCacheStorage cacheStorage = [self FFFCacheStorage:json[@"cacheStorage"]];
    FFFImageThumbnailSize thumbailSizeType = [self FFFImageThumbnailSize:json[@"thumbnailSizeType"]];
    
    NSDictionary *headers = [self NSDictionary:json[@"headers"]];
    if (headers) {
        __block BOOL allHeadersAreStrings = YES;
        [headers enumerateKeysAndObjectsUsingBlock:^(NSString *key, id header, BOOL *stop) {
            if (![header isKindOfClass:[NSString class]]) {
                RCTLogError(@"Values of HTTP headers passed must be  of type string. "
                            "Value of header '%@' is not a string.", key);
                allHeadersAreStrings = NO;
                *stop = YES;
            }
        }];
        if (!allHeadersAreStrings) {
            // Set headers to nil here to avoid crashing later.
            headers = nil;
        }
    }
    
    NSDictionary *thumbnailSize = [self NSDictionary:json[@"thumbnailSize"]];
    if(!thumbnailSize && thumbailSizeType == FFFImageThumbnailCustomSize) {
        thumbailSizeType = FFFImageThumbnailMaxSize;
    }
    
    ImageSize *imageSize;
    if(thumbailSizeType == FFFImageThumbnailCustomSize) {
        NSNumber *width =thumbnailSize[@"width"];
        NSNumber *height =thumbnailSize[@"height"];
        
        imageSize = [[ImageSize alloc] initWithWidth:[width intValue] height:[height intValue]];
    }

    
    FFFastImageSource *imageSource = [[FFFastImageSource alloc] initWithURL:uri priority:priority headers:headers cacheControl:cacheControl cacheStorage:cacheStorage thumbnailSizeType:thumbailSizeType thumbnailSize: imageSize];
    
    return imageSource;
}

RCT_ARRAY_CONVERTER(FFFastImageSource);

@end
