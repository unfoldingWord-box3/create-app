import { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  useContent,
  useCardState,
} from 'translation-helps-rcl'
import {Button} from '@material-ui/core'

export default function RepoCard({
  title,
  verse,
  server,
  owner,
  branch,
  chapter,
  classes,
  filePath,
  setQuote,
  viewMode,
  projectId,
  languageId,
  resourceId,
  selectedQuote,
  disableFilters,
  disableNavigation,
  hideMarkdownToggle,
}) 
{
  const { items, markdown } = useContent({
    verse,
    chapter,
    projectId,
    branch,
    languageId,
    resourceId,
    filePath,
    owner,
    server,
  })

  const {
    state: { item, headers, filters, fontSize, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  })

  //setMarkdownView(false);

  //const component = <Button> Click Me! </Button>

  return (
    <Card
      title={title}
      items={items}
      classes={classes}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setFontSize={setFontSize}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      disableFilters={disableFilters}
      disableNavigation={disableNavigation}
      hideMarkdownToggle={hideMarkdownToggle}
    >
        <Button style={{ fontSize: fontSize ? `${fontSize}%` : 'inherit' }}>Click Me!</Button>
        <p style={{ fontSize: fontSize ? `${fontSize}%` : 'inherit' }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </Card>
  )
}

RepoCard.propTypes = {
  viewMode: PropTypes.string,
  title: PropTypes.string.isRequired,
  chapter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  verse: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  server: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  updateTaDetails: PropTypes.func,
  setQuote: PropTypes.func,
  filePath: PropTypes.string,
  disableFilters: PropTypes.bool,
  disableNavigation: PropTypes.bool,
  hideMarkdownToggle: PropTypes.bool,
}


/* -- code graveyard

      <CardContent
        item={item}
        items={items}
        filters={filters}
        viewMode={viewMode}
        fontSize={fontSize}
        markdown={'hello'}
        setQuote={setQuote}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
      />
*/