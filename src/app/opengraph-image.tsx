import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '침대 커뮤니티'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4F6BED 0%, #7A8BFF 50%, #9FA8FF 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Moon and bed icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* Moon */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: '#FFD93D',
              position: 'relative',
              marginRight: 30,
              boxShadow: '0 10px 40px rgba(255, 217, 61, 0.4)',
            }}
          >
            {/* Moon crater effect */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 25,
                width: 25,
                height: 25,
                borderRadius: '50%',
                background: '#FFC720',
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 30,
                right: 20,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#FFC720',
                opacity: 0.3,
              }}
            />
          </div>

          {/* Bed */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Bed frame */}
            <div
              style={{
                width: 140,
                height: 80,
                background: '#fff',
                borderRadius: '12px',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Pillow */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  width: 50,
                  height: 30,
                  background: '#E8EAFF',
                  borderRadius: '8px',
                }}
              />
              {/* Blanket */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  right: 10,
                  height: 35,
                  background: '#7A8BFF',
                  borderRadius: '6px',
                  opacity: 0.6,
                }}
              />
            </div>
            {/* Bed legs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 140,
                marginTop: -5,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 20,
                  background: '#fff',
                  borderRadius: '0 0 4px 4px',
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 20,
                  background: '#fff',
                  borderRadius: '0 0 4px 4px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          침대 커뮤니티
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#E8EAFF',
            fontWeight: 500,
          }}
        >
          숙면을 위한 모든 정보
        </div>
      </div>
    ),
    { ...size }
  )
}
