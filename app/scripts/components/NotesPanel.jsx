import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Box,
    Header,
    IconButton,
    ActionList,
    Label,
    CircleBadge,
    Avatar,
} from '@primer/react';
import {
    BookIcon,
    XIcon,
    ArrowRightIcon,
    TrashIcon,
} from '@primer/octicons-react';
import WithStorage from './WithStorage';
import {parseCommentURL, STORAGE_KEYS} from '../actions/common';
import TitleLoader from './TitleLoader';
import {removeProposalNote} from '../actions/issue';

const propTypes = {
    onClose: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    notes: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
    notes: [],
};
class NotesPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.debug(this.props);
        return (
            <>
                <Header sx={{px: 3, py: 2}}>
                    <Header.Item>
                        <BookIcon size={34} />
                        <Text ml={2} fontSize="fontSizes[4]">
                            Notes
                        </Text>
                    </Header.Item>
                    <Box sx={{display: 'flex', flex: 1}} />
                    <IconButton
                        variant="default"
                        sx={{background: 'transparent'}}
                        icon={XIcon}
                        size="large"
                        onClick={this.props.onClose}
                    />
                </Header>
                <Box p={3} overflowY="auto" overflowX="hidden" height="100%" flex={1}>
                    {this.props.notes.map((note, index) => (
                        <Box
                            // eslint-disable-next-line react/no-array-index-key
                            key={`note_${index}`}
                            bg="canvas.subtle"
                            boxShadow="shadow.small"
                            borderWidth={1}
                            borderStyle="solid"
                            borderColor="border.subtle"
                            sx={{
                                ':hover': {
                                    boxShadow: 'shadow.medium',
                                },
                            }}
                            borderRadius={2}
                            className="notespanel-note"
                            mb={3}
                            position="relative"
                        >
                            <ActionList.LinkItem
                                sx={{width: 'auto', position: 'relative'}}
                                href={note.link}
                            >
                                <Text fontSize="small">
                                    Note
                                    {' #'}
                                    {index + 1}
                                </Text>
                                <ActionList.Description
                                    variant="block"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    <TitleLoader link={note.link}>{(title) => title}</TitleLoader>
                                </ActionList.Description>
                                <CircleBadge
                                    sx={{backgroundColor: 'palevioletred'}}
                                    variant="small"
                                    size={32}
                                    className="icon-go"
                                >
                                    <CircleBadge.Icon icon={ArrowRightIcon} />
                                </CircleBadge>
                            </ActionList.LinkItem>
                            <Box px={2} flexDirection="row" display="flex">
                                <Label>
                                    <Avatar src={note.userAvatar} size={16} sx={{mr: 1}} />
                                    {'  '}
                                    {note.userHandle}
                                </Label>
                                <Label sx={{ml: 1}}>
                                    #
                                    {parseCommentURL(note.link).issueID}
                                </Label>
                            </Box>
                            <Box py={2} px={3}>
                                {note.note}
                            </Box>
                            <IconButton
                                aria-label="remove"
                                variant="danger"
                                icon={TrashIcon}
                                onClick={() => removeProposalNote(note)}
                                sx={{
                                    position: 'absolute',
                                    bottom: 2,
                                    right: 2,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </>
        );
    }
}

NotesPanel.propTypes = propTypes;
NotesPanel.defaultProps = defaultProps;

export default WithStorage({
    notes: {
        key: STORAGE_KEYS.NOTE,
    },
})(NotesPanel);
