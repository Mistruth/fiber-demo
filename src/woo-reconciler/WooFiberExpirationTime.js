export const NoWork = 0

export const NoEffect = 0

export const LOW_PRIORITY_EXPIRATION = 5000
export const LOW_PRIORITY_BATCH_SIZE = 250

export function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE
  )
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {

  

}
