'use client';

interface AssetData {
  uuid: string;
  symbol: string;
  name: string;
  allocation: number;
  value: number;
  quantity: number;
  wallet?: {
    name: string;
  };
}

interface PieChartProps {
  data: AssetData[];
  width?: number;
  height?: number;
}

export default function PieChart({ data = [], width = 300, height = 300 }: PieChartProps) {
  const assets = data || [];
  
  // Se não há dados, mostrar mensagem
  if (!assets || assets.length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">Nenhum dado disponível para o gráfico</p>
        </div>
      </div>
    );
  }
  
  // Cores para cada slice do gráfico
  const colors = [
    '#3B82F6', // Blue
    '#F59E0B', // Orange
    '#10B981', // Green
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#84CC16'  // Lime
  ];

  // Calcular ângulos para cada slice
  let currentAngle = 0;
  const slices = assets.map((asset, index) => {
    const angle = (asset.allocation / 100) * 360;
    const startAngle = Math.round(currentAngle * 100) / 100; // Arredondar para evitar diferenças de precisão
    currentAngle += angle;
    const endAngle = Math.round(currentAngle * 100) / 100; // Arredondar para evitar diferenças de precisão
    
    return {
      ...asset,
      startAngle,
      endAngle,
      color: colors[index % colors.length]
    };
  });

  // Função para converter ângulos em coordenadas SVG
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Função para criar path SVG para cada slice
  const createSlicePath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, startAngle);
    const end = polarToCartesian(centerX, centerY, radius, endAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      "L 150 150",
      "Z"
    ].join(" ");
  };

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <svg width={width} height={height} className="drop-shadow-lg">
          {/* Slices do gráfico */}
          {slices.map((slice, index) => (
            <path
              key={`slice-${slice.uuid}-${index}`}
              d={createSlicePath(centerX, centerY, radius, slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke="#fff"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
            />
          ))}
          
          {/* Círculo central */}
          <circle
            cx={centerX}
            cy={centerY}
            r="20"
            fill="white"
            className="drop-shadow-md"
          />
          
          {/* Texto central */}
          <text
            x={centerX}
            y={centerY + 5}
            textAnchor="middle"
            className="text-sm font-medium fill-gray-600"
          >
            Total
          </text>
        </svg>
      </div>

      {/* Legenda */}
      <div className="space-y-2">
        {slices.map((slice, index) => (
          <div key={`legend-${slice.uuid}-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="font-medium text-gray-900 dark:text-white">
                {slice.symbol}
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {slice.allocation.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
