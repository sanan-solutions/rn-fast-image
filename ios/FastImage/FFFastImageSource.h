#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, FFFPriority) {
    FFFPriorityLow,
    FFFPriorityNormal,
    FFFPriorityHigh
};

typedef NS_ENUM(NSInteger, FFFCacheControl) {
    FFFCacheControlImmutable,
    FFFCacheControlWeb,
    FFFCacheControlCacheOnly
};

typedef NS_ENUM(NSInteger, FFFCacheStorage) {
    FFFCacheStorageNone,
    FFFCacheStorageDiskOnly,
    FFFCacheStorageMemoryOnly,
    FFFCacheStorageAll,
};

typedef NS_ENUM(NSInteger, FFFImageThumbnailSize) {
    FFFImageThumbnailMaxSize,
    FFFImageThumbnailMatchViewSize,
    FFFImageThumbnailCustomSize,
};

@interface ImageSize : NSObject

@property (nonatomic, assign) int width;
@property (nonatomic, assign) int height;

- (instancetype)initWithWidth:(int)width height:(int)height;

@end

// Object containing an image uri and metadata.
@interface FFFastImageSource : NSObject

// uri for image, or base64
@property (nonatomic) NSURL* url;
// priority for image request
@property (nonatomic) FFFPriority priority;
// headers for the image request
@property (nonatomic) NSDictionary *headers;
// cache control mode
@property (nonatomic) FFFCacheControl cacheControl;

@property (nonatomic) FFFCacheStorage cacheStorage;

@property (nonatomic) FFFImageThumbnailSize thumbnailSizeType;

@property (nonatomic) ImageSize *thumbnailSize;

- (instancetype)initWithURL:(NSURL *)url
                   priority:(FFFPriority)priority
                    headers:(NSDictionary *)headers
               cacheControl:(FFFCacheControl)cacheControl
               cacheStorage: (FFFCacheStorage)cacheStorage
          thumbnailSizeType: (FFFImageThumbnailSize) thumbnailSizeType
              thumbnailSize: (ImageSize *) thumbnailSize;

@end
