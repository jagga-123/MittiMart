import { stateData } from '../data/mockData';

const IndiaMap = ({ selectedState, onSelectState }) => {
  const currentStateData = stateData.find((s) => s.name === selectedState) || stateData[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-brand-card border border-brand-brown/10 rounded-xl p-4 md:p-6 shadow-premium backdrop-blur-md">
      {/* Map SVG Block - takes 2 cols on wide screens */}
      <div className="lg:col-span-2 flex items-center justify-center bg-brand-cream/30 rounded-xl p-4 overflow-hidden relative">
        <svg
          id="india-map"
          viewBox="0 0 540 620"
          className="w-full max-w-[480px] h-auto select-none"
          aria-label="Interactive craft map of India"
        >
          <defs>
            <linearGradient id="mapGlow" x1="0" x2="1">
              <stop offset="0%" stopColor="#FAF6F1" />
              <stop offset="100%" stopColor="#F5E6DA" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="540" height="620" rx="36" fill="url(#mapGlow)" />

          {/* Main subcontinent outline shadow */}
          <path
            d="M190 70 L260 40 L340 78 L372 150 L338 190 L352 265 L320 345 L340 432 L292 545 L210 510 L180 438 L146 390 L164 305 L132 226 L152 165 Z"
            fill="rgba(92,61,46,0.08)"
            stroke="rgba(92,61,46,0.18)"
            strokeWidth="2"
          />

          {/* Interactive States */}
          <g
            onClick={() => onSelectState('Rajasthan')}
            className={`map-state cursor-pointer group ${selectedState === 'Rajasthan' ? 'active' : ''}`}
          >
            <path
              d="M136 150 L200 130 L236 188 L196 234 L140 206 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Rajasthan' ? '#d4622a' : undefined,
                stroke: selectedState === 'Rajasthan' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="175" y="184" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Rajasthan' ? 'fill-white' : ''}`}>Rajasthan</text>
          </g>

          <g
            onClick={() => onSelectState('Gujarat')}
            className={`map-state cursor-pointer group ${selectedState === 'Gujarat' ? 'active' : ''}`}
          >
            <path
              d="M96 222 L156 210 L170 286 L120 312 L82 272 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Gujarat' ? '#d4622a' : undefined,
                stroke: selectedState === 'Gujarat' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="121" y="263" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Gujarat' ? 'fill-white' : ''}`}>Gujarat</text>
          </g>

          <g
            onClick={() => onSelectState('Uttar Pradesh')}
            className={`map-state cursor-pointer group ${selectedState === 'Uttar Pradesh' ? 'active' : ''}`}
          >
            <path
              d="M250 168 L340 168 L362 224 L286 238 L240 205 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Uttar Pradesh' ? '#d4622a' : undefined,
                stroke: selectedState === 'Uttar Pradesh' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="287" y="208" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Uttar Pradesh' ? 'fill-white' : ''}`}>U.P.</text>
          </g>

          <g
            onClick={() => onSelectState('Bihar')}
            className={`map-state cursor-pointer group ${selectedState === 'Bihar' ? 'active' : ''}`}
          >
            <path
              d="M338 168 L408 170 L418 220 L356 228 L344 196 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Bihar' ? '#d4622a' : undefined,
                stroke: selectedState === 'Bihar' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="377" y="204" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Bihar' ? 'fill-white' : ''}`}>Bihar</text>
          </g>

          <g
            onClick={() => onSelectState('West Bengal')}
            className={`map-state cursor-pointer group ${selectedState === 'West Bengal' ? 'active' : ''}`}
          >
            <path
              d="M396 224 L464 232 L454 296 L402 286 L388 254 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'West Bengal' ? '#d4622a' : undefined,
                stroke: selectedState === 'West Bengal' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="430" y="266" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'West Bengal' ? 'fill-white' : ''}`}>W. Bengal</text>
          </g>

          <g
            onClick={() => onSelectState('Odisha')}
            className={`map-state cursor-pointer group ${selectedState === 'Odisha' ? 'active' : ''}`}
          >
            <path
              d="M340 258 L406 266 L392 334 L338 324 L326 286 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Odisha' ? '#d4622a' : undefined,
                stroke: selectedState === 'Odisha' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="362" y="305" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Odisha' ? 'fill-white' : ''}`}>Odisha</text>
          </g>

          <g
            onClick={() => onSelectState('Tamil Nadu')}
            className={`map-state cursor-pointer group ${selectedState === 'Tamil Nadu' ? 'active' : ''}`}
          >
            <path
              d="M238 430 L320 438 L306 520 L250 524 L224 474 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Tamil Nadu' ? '#d4622a' : undefined,
                stroke: selectedState === 'Tamil Nadu' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="264" y="487" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Tamil Nadu' ? 'fill-white' : ''}`}>Tamil Nadu</text>
          </g>

          <g
            onClick={() => onSelectState('Kashmir')}
            className={`map-state cursor-pointer group ${selectedState === 'Kashmir' ? 'active' : ''}`}
          >
            <path
              d="M182 36 L254 20 L286 60 L226 80 L174 64 Z"
              className="group-hover:fill-brand-orange/30 group-hover:stroke-brand-orange transition-all duration-300"
              style={{
                fill: selectedState === 'Kashmir' ? '#d4622a' : undefined,
                stroke: selectedState === 'Kashmir' ? '#5c3d2e' : undefined,
              }}
            />
            <text x="225" y="52" className={`text-[11px] font-bold fill-brand-brown pointer-events-none ${selectedState === 'Kashmir' ? 'fill-white' : ''}`}>Kashmir</text>
          </g>
        </svg>
      </div>

      {/* State Detail Side Panel */}
      <aside className="bg-white/90 border border-brand-brown/5 rounded-2xl p-5 shadow-premium flex flex-col justify-center h-full">
        <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-extrabold px-3 py-1 rounded-full w-fit mb-3">
          Explore Regional Art
        </span>
        <h3 className="font-heading text-2xl font-bold text-brand-brown mb-2">
          {currentStateData.name}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-4">
          Famous Crafts: {currentStateData.desc}
        </p>
        <div className="border-t border-brand-brown/5 pt-4">
          <h4 className="text-xs uppercase font-semibold text-brand-brown/70 tracking-wider mb-2">Signature Handcrafts</h4>
          <ul className="flex flex-col gap-2">
            {currentStateData.crafts.map((craft, idx) => (
              <li
                key={idx}
                className="bg-brand-cream/50 hover:bg-brand-cream transition-colors text-brand-brown text-sm font-medium px-4 py-2.5 rounded-xl border border-brand-brown/5 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                {craft}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default IndiaMap;
