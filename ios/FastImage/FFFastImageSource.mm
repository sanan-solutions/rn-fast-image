#import "FFFastImageSource.h"

@implementation ImageSize

- (instancetype)initWithWidth:(int)width height:(int)height {
    self = [super init];
    if (self) {
        _width = width;
        _height = height;
    }
    return self;
}

@end

@implementation FFFastImageSource

- (instancetype)initWithURL:(NSURL *)url
                   priority:(FFFPriority)priority
                    headers:(NSDictionary *)headers
               cacheControl:(FFFCacheControl)cacheControl
                cacheStorage: (FFFCacheStorage)caccheStorage
                thumbnailSizeType:(FFFImageThumbnailSize)thumbnailSizeType
              thumbnailSize:(ImageSize *)thumbnailSize
{
    self = [super init];
    if (self) {
        _url = url;
        _priority = priority;
        _headers = headers;
        _cacheControl = cacheControl;
        _cacheStorage = caccheStorage;
        _thumbnailSizeType = thumbnailSizeType;
        _thumbnailSize = thumbnailSize;
    }
    return self;
}

@end
