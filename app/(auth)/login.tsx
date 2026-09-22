import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Aperture,
  ShieldCheck,
  UserRound,
  Landmark,
  IdCard,
  KeyRound,
  Eye,
  EyeOff,
  Lock,
  MapPin,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react-native';

type Role = 'inspector' | 'official';

const COLORS = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  slate900: '#0F172A',
  slate700: '#334155',
  slate500: '#64748B',
  slate400: '#94A3B8',
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryTint: '#EFF6FF',
  primarySoft: '#DBEAFE',
  success: '#16A34A',
  successTint: '#F0FDF4',
};

export default function LoginScreen() {
  const [role, setRole] = useState<Role>('inspector');
  const [officerId, setOfficerId] = useState('');
  const [pin, setPin] = useState('');
  const [pinVisible, setPinVisible] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const roleCopy =
    role === 'inspector'
      ? {
          placeholder: 'INSP-DL-2025-8831',
          label: 'Officer ID / Aadhaar UID',
        }
      : {
          placeholder: 'DOSJE-HQ-2025-0142',
          label: 'Official ID / Aadhaar UID',
        };

  const handleAuthenticate = () => {
    setAuthenticating(true);
    setTimeout(() => setAuthenticating(false), 1400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Crest + branding */}
        <View style={styles.headerBlock}>
          <View style={styles.badgeRow}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>GOVT OF INDIA</Text>
            <View style={styles.badgeSep} />
            <Text style={styles.badgeText}>NIC CLOUD SECURED</Text>
          </View>

          <View style={styles.crestOuter}>
            <View style={styles.crestInner}>
              <Aperture size={30} color="#FFFFFF" strokeWidth={1.8} />
            </View>
          </View>

          <Text style={styles.title}>Drishti-AI</Text>
          <Text style={styles.subtitle}>
            Smart Real-Time Monitoring &amp; Inspection
          </Text>

          <View style={styles.deptChip}>
            <Landmark size={13} color={COLORS.slate500} strokeWidth={2} />
            <Text style={styles.deptChipText}>
              Dept of Social Justice &amp; Empowerment (DOSJE)
            </Text>
          </View>
        </View>

        {/* Role selector */}
        <View style={styles.roleRow}>
          <Pressable
            onPress={() => setRole('inspector')}
            style={[
              styles.roleCard,
              role === 'inspector' ? styles.roleCardActive : styles.roleCardInactive,
            ]}
          >
            <View
              style={[
                styles.roleIconWrap,
                role === 'inspector'
                  ? styles.roleIconWrapActive
                  : styles.roleIconWrapInactive,
              ]}
            >
              <UserRound
                size={18}
                color={role === 'inspector' ? '#FFFFFF' : COLORS.slate400}
                strokeWidth={2}
              />
            </View>
            <Text
              style={[
                styles.roleLabel,
                role === 'inspector' ? styles.roleLabelActive : styles.roleLabelInactive,
              ]}
            >
              PMU Inspector
            </Text>
            <Text
              style={[
                styles.roleSubLabel,
                role === 'inspector' && styles.roleSubLabelActive,
              ]}
            >
              Field Officer
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setRole('official')}
            style={[
              styles.roleCard,
              role === 'official' ? styles.roleCardActive : styles.roleCardInactive,
            ]}
          >
            <View
              style={[
                styles.roleIconWrap,
                role === 'official'
                  ? styles.roleIconWrapActive
                  : styles.roleIconWrapInactive,
              ]}
            >
              <Landmark
                size={18}
                color={role === 'official' ? '#FFFFFF' : COLORS.slate400}
                strokeWidth={2}
              />
            </View>
            <Text
              style={[
                styles.roleLabel,
                role === 'official' ? styles.roleLabelActive : styles.roleLabelInactive,
              ]}
            >
              DOSJE Official
            </Text>
            <Text
              style={[
                styles.roleSubLabel,
                role === 'official' && styles.roleSubLabelActive,
              ]}
            >
              HQ Reviewer
            </Text>
          </Pressable>
        </View>

        <View style={styles.scopeRow}>
          <View style={styles.scopeLine} />
          <Text style={styles.scopeText}>
            Scope: Geotagged Audits, Telemetry &amp; Real-Time Field Sync
          </Text>
          <View style={styles.scopeLine} />
        </View>

        {/* Form card */}
        <View style={styles.formCard}>
          <View style={styles.fieldLabelRow}>
            <Text style={styles.fieldLabel}>
              {roleCopy.label} <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.directoryBadge}>
              <BadgeCheck size={11} color={COLORS.primary} strokeWidth={2.2} />
              <Text style={styles.directoryBadgeText}>Official Directory</Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <IdCard size={18} color={COLORS.slate400} strokeWidth={1.8} />
            <TextInput
              value={officerId}
              onChangeText={setOfficerId}
              placeholder={roleCopy.placeholder}
              placeholderTextColor={COLORS.slate400}
              style={styles.input}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          <View style={[styles.fieldLabelRow, { marginTop: 20 }]}>
            <Text style={styles.fieldLabel}>
              Secure Password / PIN <Text style={styles.required}>*</Text>
            </Text>
            <Pressable>
              <Text style={styles.forgotLink}>Forgot PIN?</Text>
            </Pressable>
          </View>

          <View style={styles.inputWrap}>
            <KeyRound size={18} color={COLORS.slate400} strokeWidth={1.8} />
            <TextInput
              value={pin}
              onChangeText={setPin}
              placeholder="••••••••"
              placeholderTextColor={COLORS.slate400}
              style={styles.input}
              secureTextEntry={!pinVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              onPress={() => setPinVisible((v) => !v)}
              hitSlop={8}
              style={styles.eyeButton}
            >
              {pinVisible ? (
                <EyeOff size={18} color={COLORS.slate400} strokeWidth={1.8} />
              ) : (
                <Eye size={18} color={COLORS.slate400} strokeWidth={1.8} />
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={handleAuthenticate}
            style={({ pressed }) => [
              styles.authButton,
              pressed && styles.authButtonPressed,
            ]}
          >
            <KeyRound size={17} color="#FFFFFF" strokeWidth={2.2} />
            <Text style={styles.authButtonText}>
              {authenticating ? 'Authenticating…' : 'Authenticate Session'}
            </Text>
            <ChevronRight size={17} color="#FFFFFF" strokeWidth={2.2} />
          </Pressable>

          <View style={styles.cardFooter}>
            <Lock size={12} color={COLORS.success} strokeWidth={2.2} />
            <Text style={styles.cardFooterText}>
              End-to-End Encrypted Session • TLS 1.3
            </Text>
          </View>
        </View>

        {/* Geofence telemetry footer */}
        <View style={styles.geoCard}>
          <View style={styles.geoHeaderRow}>
            <View style={styles.geoIconWrap}>
              <ShieldCheck size={15} color={COLORS.primary} strokeWidth={2} />
            </View>
            <Text style={styles.geoHeaderText}>
              PostGIS Geofenced Access Active
            </Text>
          </View>

          <View style={styles.geoNodeRow}>
            <MapPin size={13} color={COLORS.slate500} strokeWidth={2} />
            <Text style={styles.geoNodeText}>
              <Text style={styles.geoNodeLabel}>Current Node: </Text>
              New Delhi Central Secretariat (28.6139° N, 77.2090° E) · Precision
              ±3.2m
            </Text>
          </View>

          <View style={styles.geoDivider} />

          <Text style={styles.buildText}>
            Build: v3.4.1 (DOSJE-STAGING-PROD)  ·  NIC Helpdesk 1800-11-2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // Header
  headerBlock: {
    alignItems: 'center',
    marginTop: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
    marginRight: 7,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 0.6,
  },
  badgeSep: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#475569',
    marginHorizontal: 8,
  },
  crestOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primarySoft,
  },
  crestInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.slate900,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.slate500,
    marginTop: 4,
    textAlign: 'center',
  },
  deptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 14,
    gap: 6,
  },
  deptChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.slate700,
  },

  // Role selector
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
  },
  roleCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  roleCardActive: {
    backgroundColor: COLORS.primaryTint,
    borderColor: COLORS.primary,
  },
  roleCardInactive: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },
  roleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  roleIconWrapActive: {
    backgroundColor: COLORS.primary,
  },
  roleIconWrapInactive: {
    backgroundColor: '#F1F5F9',
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  roleLabelActive: {
    color: COLORS.primaryDark,
  },
  roleLabelInactive: {
    color: COLORS.slate700,
  },
  roleSubLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.slate400,
    marginTop: 2,
  },
  roleSubLabelActive: {
    color: '#60A5FA',
  },

  // Scope divider
  scopeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 10,
  },
  scopeLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  scopeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.slate500,
    textAlign: 'center',
  },

  // Form card
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginTop: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.slate700,
  },
  required: {
    color: COLORS.primary,
  },
  directoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryTint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  directoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
  },
  forgotLink: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.primary,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginTop: 8,
    gap: 10,
    backgroundColor: '#F8FAFC',
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
    color: COLORS.slate900,
    height: '100%',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  eyeButton: {
    padding: 2,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 52,
    marginTop: 22,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  authButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  authButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  cardFooterText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.slate500,
  },

  // Geofence telemetry footer
  geoCard: {
    backgroundColor: COLORS.successTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    padding: 16,
    marginTop: 20,
  },
  geoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  geoIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  geoHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.slate900,
  },
  geoNodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 10,
  },
  geoNodeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.slate700,
    fontWeight: '500',
  },
  geoNodeLabel: {
    fontWeight: '700',
    color: COLORS.slate900,
  },
  geoDivider: {
    height: 1,
    backgroundColor: '#DCFCE7',
    marginVertical: 10,
  },
  buildText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.slate500,
    letterSpacing: 0.2,
  },
});
