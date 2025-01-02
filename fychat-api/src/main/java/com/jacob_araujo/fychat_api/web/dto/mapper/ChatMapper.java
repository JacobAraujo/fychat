package com.jacob_araujo.fychat_api.web.dto.mapper;

import com.jacob_araujo.fychat_api.entity.Chat;
import com.jacob_araujo.fychat_api.web.dto.ChatCreateDto;
import com.jacob_araujo.fychat_api.web.dto.ChatResponseDto;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;

import java.util.List;
import java.util.stream.Collectors;

public class ChatMapper {

    public static Chat toChat(ChatCreateDto createDto) {
        ModelMapper mapperMain = new ModelMapper();

        Converter<Boolean, Chat.ChatType> booleanToChatTypeConverter =
                new AbstractConverter<Boolean, Chat.ChatType>() {
                    @Override
                    protected Chat.ChatType convert(Boolean source) {
                        if (source == null || !source) {
                            return Chat.ChatType.PRIVATE;
                        }
                        return Chat.ChatType.PUBLIC;
                    }
                };

        mapperMain
                .createTypeMap(ChatCreateDto.class, Chat.class)
                .addMappings(mapping -> {
                    mapping.using(booleanToChatTypeConverter)
                            .map(ChatCreateDto::getChatType, Chat::setChatType);

                    mapping.map(ChatCreateDto::getChatName, Chat::setGroupName);
                });

        return mapperMain.map(createDto, Chat.class);
    }

    public static ChatResponseDto toDto(Chat chat) {
        ModelMapper mapperMain = new ModelMapper();
        TypeMap<Chat, ChatResponseDto> propertyMapper = mapperMain.createTypeMap(Chat.class, ChatResponseDto.class);

        propertyMapper.addMappings(mapper -> mapper.map(Chat::getGroupName, ChatResponseDto::setChatName));

        return mapperMain.map(chat, ChatResponseDto.class);
    }

    public static List<ChatResponseDto> toListDto(List<Chat> chats){
        return chats.stream().map(chat -> toDto(chat)).collect(Collectors.toList());
    }

}
