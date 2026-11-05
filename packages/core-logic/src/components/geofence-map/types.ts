/**
 * Category taxonomy for saved transit and commute destinations.
 */
export type TransitSpotCategory = "transit" | "workplace" | "home" | "foodAndBeverage";

/**
 * Coordinate contract for geofence center point in EPSG:4326 (WGS 84).
 */
export interface MapCoordinate {
  latitude: number;
  longitude: number;
}

/**
 * Data structure representing a saved transit geofence spot based on Screen 05 specifications.
 */
export interface TransitSpot {
  id: string;
  name: string;
  category: TransitSpotCategory;
  categoryLabel: string;
  defaultPayment: string;
  radiusMeters: number;
  visitedCount: number;
  lastVisitText: string;
  isActive?: boolean;
  coordinate: MapCoordinate;
  color: string;
  fillColor: string;
  iconType: "train" | "building" | "home" | "coffee";
}

/**
 * Region boundaries controlling map viewport centering and zoom factor.
 */
export interface MapRegion extends MapCoordinate {
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Props contract for the primary Screen 05 Geofence Map screen.
 */
export interface GeofenceMapScreenProps {
  spots?: TransitSpot[];
  initialRegion?: MapRegion;
  activeSpotId?: string;
  onSelectSpot?: (spot: TransitSpot) => void;
  onAddSpotPress?: () => void;
  onRecenterPress?: () => void;
  onSearchChange?: (query: string) => void;
  testID?: string;
}

/**
 * Imperative handle ref exposed by GeofenceMapViewport for external camera commands.
 */
export interface GeofenceMapViewportRef {
  recenter: () => void;
  focusSpot: (spot: TransitSpot) => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
}

/**
 * Props contract for the native map viewport presentation layer.
 */
export interface GeofenceMapViewportProps {
  spots: TransitSpot[];
  activeSpotId?: string;
  selectedSpotId?: string;
  onSelectSpot?: (spot: TransitSpot) => void;
  onRecenterPress?: () => void;
  onZoomInPress?: () => void;
  onZoomOutPress?: () => void;
  onToggle3DPress?: () => void;
  is3D?: boolean;
  isLoading?: boolean;
}

/**
 * Props contract for individual saved transit spot list item.
 */
export interface GeofenceSpotItemProps {
  spot: TransitSpot;
  isActive?: boolean;
  onPress?: () => void;
}

/**
 * Props contract for the top floating search input.
 */
export interface GeofenceSearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearchPress?: () => void;
  onRecenterPress?: () => void;
  onVoiceSearchPress?: () => void;
}

/**
 * Props contract for the expandable saved transit spots bottom sheet.
 */
export interface GeofenceBottomSheetProps {
  spots: TransitSpot[];
  activeSpotId?: string;
  selectedSpotId?: string;
  onSelectSpot?: (spot: TransitSpot) => void;
  onAddSpotPress?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
