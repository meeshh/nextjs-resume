/* eslint-disable jsx-a11y/alt-text */
import {
  Certification,
  Education,
  Language,
  ProfessionalExperience,
  SoftSkill,
  TechSkill,
  personal,
} from '@content';

import {
  Document,
  Image,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';
import { HtmlProps } from 'react-pdf-html/dist/Html';
import resumeConfig from '../../../edit-me/config/resumeConfig';
import { Theme } from '../../../edit-me/types/Config';
import { contrastColor } from '../../helpers/colorContrast';
import { getAccentColor, getNeutralColor } from '../../helpers/colors';
import {
  fullName,
  firstName,
  lastName,
  sortedCertifications,
  sortedEducations,
  sortedLanguages,
  sortedProfessionalExperiences,
  sortedSoftSkills,
  sortedTechSkills,
} from '../../helpers/utils';
import { htmlRenderers } from './htmlRenderers';

const theme = resumeConfig.pdfTheme;
const domain = process.env.NEXT_PUBLIC_VERCEL_URL
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : 'http://localhost:3000';
const fontPath = `${domain}/fonts`;

Font.register({
  family: 'Albert Sans',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      src: `${fontPath}/AlbertSans-Regular.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
      src: `${fontPath}/AlbertSans-Italic.ttf`,
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
      src: `${fontPath}/AlbertSans-Bold.ttf`,
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
      src: `${fontPath}/AlbertSans-BoldItalic.ttf`,
    },
  ],
});

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    {
      fontStyle: 'normal',
      fontWeight: 500,
      src: `${fontPath}/JetBrainsMono-Medium.ttf`,
    },
  ],
});

const hyphenationCallback = (word: string) => {
  // don't hyphenate
  return [word];
};

Font.registerHyphenationCallback(hyphenationCallback);

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const fontSizes = {
  xl: 20,
  l: 18,
  m: 14,
  s: 13,
  xs: 12,
  xxs: 10,
  xxxs: 8,
};

const spacers = {
  1: '6px',
  2: '8px',
  3: '10px',
  4: '12px',
  5: '14px',
  6: '16px',
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'stretch',
    backgroundColor: getNeutralColor(1, theme),
    color: getNeutralColor(12, theme),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontFamily: 'Albert Sans',
    fontSize: fontSizes.xxs,
    justifyContent: 'flex-start',
    lineHeight: 1.3,
  },
  sidebar: {
    alignSelf: 'stretch',
    backgroundColor: '#5350a2',
    display: 'flex',
    color: 'white',
    flexBasis: '40%',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
  },
  sidebarContent: { padding: spacers[4] },
  header: {
    backgroundColor:
      theme === Theme.Dark
        ? getNeutralColor(2, theme)
        : getAccentColor(9, theme),
    color: contrastColor,
    padding: `${spacers[6]} ${spacers[4]}`,
    textAlign: 'center',
  },
  headerTitle: { fontSize: fontSizes.xl, fontWeight: 700 },
  headerSubtitle: { fontSize: fontSizes.m, fontWeight: 700 },
  main: {
    alignSelf: 'stretch',
    display: 'flex',
    flexBasis: '70%',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    padding: spacers[4],
  },
  section: { marginBottom: spacers[4] },
  sectionHeading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
  },
  sectionHeadingNonHTML: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizes.m,
    fontWeight: 700,
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  sectionHeadingIcon: {
    height: fontSizes.m,
    marginRight: spacers[1],
    width: fontSizes.m,
  },
  sectionHeadingStars: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  sectionParagraph: {
    fontWeight: 400,
    margin: 0,
  },
  itemHeading: {
    fontSize: fontSizes.xs,
    fontWeight: 700,
    gap: spacers[1],
  },
  itemSubheadingRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: spacers[1],
    marginBottom: spacers[1],
  },
  itemSubheading: {
    fontSize: fontSizes.xxs,
    fontStyle: 'italic',
  },
  professionalTitle: {
    borderRadius: '3px',
    fontWeight: 700,
  },
  bold: { fontWeight: 700 },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexRow: { alignItems: 'center', display: 'flex', flexDirection: 'row' },
  flexRowAlignStart: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  a: {
    color: getAccentColor(11, theme),
    textDecoration: 'underline',
  },
  list: {
    marginTop: spacers[2],
  },
  code: {
    backgroundColor: getNeutralColor(4, theme),
    borderRadius: '3px',
    fontFamily: 'JetBrains Mono',
    fontWeight: 500,
    paddingHorizontal: spacers[2],
  },
});

const htmlProps: Omit<HtmlProps, 'children'> = {
  renderers: htmlRenderers,
  style: { fontSize: fontSizes.xxxs },
  stylesheet: {
    a: styles.a,
    p: styles.sectionParagraph,
    ul: styles.list,
    ol: styles.list,
    code: styles.code,
  },
};

type PDFProps = {
  privateInfo: {
    email: 'string';
    mobile: 'string';
  };
};

const PDF: React.FC<PDFProps> = ({ privateInfo }) => {
  const year = new Date().getFullYear();

  const { email, mobile } = privateInfo;

  return (
    // @ts-ignore
    <Document author={fullName} title={`Résume for ${fullName}, ${year}`}>
      {/* @ts-ignore */}
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View
            style={{
              ...styles.section,
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <View>
              <Image
                src="https://avatars.githubusercontent.com/u/620224?v=4"
                style={{ width: 50, height: 50, borderRadius: '50%' }}
              />
            </View>
            <View
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Text style={{ ...styles.headerTitle, color: '#5350a2' }}>
                  {firstName}
                </Text>
                <Text style={{ ...styles.headerTitle, color: 'gray' }}>
                  {lastName}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.headerSubtitle,
                  fontSize: 10,
                  color: 'gray',
                }}
              >
                {personal.title}
              </Text>
            </View>
            <View
              style={{
                fontSize: 6,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'right',
              }}
            >
              <Text style={{ textAlign: 'right' }}>{personal.location}</Text>
              <Text style={{ textTransform: 'lowercase' }}>{email}</Text>
              <Text style={{ textAlign: 'right' }}>{mobile}</Text>
            </View>
          </View>
          <View style={{ ...styles.section }}>
            <View style={{ ...styles.sectionHeading, marginBottom: 8 }}>
              <Text style={{ color: '#5350a2' }}>WORK EXPERIENCE</Text>
            </View>
            {sortedProfessionalExperiences.map(
              (professionalExperience: ProfessionalExperience) => (
                <View
                  style={{ marginLeft: 20 }}
                  key={professionalExperience._id}
                >
                  {professionalExperience.connectBottom && (
                    <View
                      style={{
                        backgroundColor: '#c1c0ff',
                        width: 1,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: -13.5,
                      }}
                    />
                  )}
                  <View
                    style={{
                      ...styles.itemHeading,
                      display: 'flex',
                      flexDirection: 'row',
                      position: 'relative',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#c1c0ff',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        position: 'absolute',
                        top: 0,
                        left: -18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#5350a2',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.professionalTitle,
                        flexGrow: 1,
                        fontSize: 9,
                      }}
                    >
                      {professionalExperience.title}
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 6 }}>
                      {professionalExperience.startDate}—
                      {professionalExperience.endDate
                        ? professionalExperience.endDate
                        : 'Current'}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 8 }}>
                      {professionalExperience.organization}
                    </Text>
                  </View>
                  <Html {...htmlProps} style={{ fontSize: 7.25 }}>
                    {professionalExperience.body.html}
                  </Html>
                </View>
              ),
            )}
          </View>
        </View>
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            <View style={{ fontSize: 8, marginBottom: 24 }}>
              <Html {...htmlProps}>{personal.body.html}</Html>
            </View>
            <View style={styles.section}>
              <Text style={{ ...styles.sectionHeading, marginBottom: 8 }}>
                SKILLS
              </Text>
              <View
                style={{
                  borderLeft: `1px solid white`,
                  marginBottom: 20,
                }}
              >
                {sortedTechSkills.map((techSkill: TechSkill, index: number) => (
                  <View
                    key={techSkill._id}
                    style={{
                      marginBottom:
                        index === sortedTechSkills.length - 1 ? '0px' : '8px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '8px',
                        padding: '2px 4px',
                      }}
                    >
                      {techSkill.name}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: '8px',
                        backgroundColor: '#c1c0ff',
                      }}
                    >
                      <View
                        style={{
                          width: `${techSkill.knowledge}%`,
                          height: '100%',
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  borderLeft: `1px solid white`,
                  marginBottom: 20,
                }}
              >
                {sortedSoftSkills.map((softSkill: SoftSkill, index: number) => (
                  <View
                    key={softSkill._id}
                    style={{
                      marginBottom:
                        index === sortedSoftSkills.length - 1 ? '0px' : '8px',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '8px',
                        padding: '2px 4px',
                      }}
                    >
                      {softSkill.name}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: '8px',
                        backgroundColor: '#c1c0ff',
                      }}
                    >
                      <View
                        style={{
                          width: `${softSkill.knowledge}%`,
                          height: '100%',
                          backgroundColor: 'white',
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={{ ...styles.sectionHeading, marginBottom: 8 }}>
                EDUCATION
              </Text>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                {sortedEducations.map((education: Education) => (
                  <View key={education._id}>
                    <View
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{ ...styles.bold, fontSize: 10, flexGrow: 1 }}
                      >
                        {education.degree}
                      </Text>
                      <Text style={{ fontSize: 6 }}>
                        {education.startYear}&nbsp;-&nbsp;{education.endYear}
                      </Text>
                    </View>
                    <Text>{education.organization}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={{ ...styles.sectionHeading, marginBottom: 8 }}>
                CERTIFICATIONS
              </Text>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                {sortedCertifications.map((certification: Certification) => (
                  <View key={certification._id} style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Link
                        src={certification.url || '#'}
                        style={{
                          ...styles.bold,
                          fontSize: 10,
                          flexGrow: 1,
                          color: 'white',
                        }}
                      >
                        {certification.certification}
                      </Link>
                      <Text style={{ fontSize: 6 }}>
                        {certification.completionYear}
                      </Text>
                    </View>
                    <Text>{certification.issuer}</Text>
                    {certification.credentialId && (
                      <Text style={{ fontSize: 8 }}>
                        Credential ID:&nbsp;{certification.credentialId}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={{ ...styles.sectionHeading, marginBottom: 8 }}>
                LANGUAGES
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ width: '50%', flexGrow: 1 }}>
                  {sortedLanguages
                    .slice(0, Math.ceil(sortedLanguages.length / 2))
                    .map((language: Language) => (
                      <View key={language._id} style={{ marginBottom: 8 }}>
                        <>
                          <Text>{language.language}</Text>
                          <View
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            {Array.from(Array(5)).map((level, index) =>
                              index < language.level ? (
                                <View
                                  key={index}
                                  style={{
                                    backgroundColor: 'white',
                                    width: 10,
                                    height: 10,
                                    marginRight: 4,
                                    borderRadius: '50%',
                                  }}
                                />
                              ) : (
                                <View
                                  key={index}
                                  style={{
                                    backgroundColor: '#c1c0ff',
                                    width: 10,
                                    height: 10,
                                    marginRight: 4,
                                    borderRadius: '50%',
                                  }}
                                />
                              ),
                            )}
                          </View>
                        </>
                      </View>
                    ))}
                </View>
                <View style={{ width: '50%' }}>
                  {sortedLanguages
                    .slice(Math.ceil(sortedLanguages.length / 2))
                    .map((language: Language) => (
                      <View key={language._id} style={{ marginBottom: 8 }}>
                        <>
                          <Text>{language.language}</Text>
                          <View
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            {Array.from(Array(5)).map((level, index) =>
                              index < language.level ? (
                                <View
                                  key={index}
                                  style={{
                                    backgroundColor: 'white',
                                    width: 10,
                                    height: 10,
                                    marginRight: 4,
                                    borderRadius: '50%',
                                  }}
                                />
                              ) : (
                                <View
                                  key={index}
                                  style={{
                                    backgroundColor: '#c1c0ff',
                                    width: 10,
                                    height: 10,
                                    marginRight: 4,
                                    borderRadius: '50%',
                                  }}
                                />
                              ),
                            )}
                          </View>
                        </>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
