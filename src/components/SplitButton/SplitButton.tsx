import { Button, Group, Loader, Box } from '@mantine/core';
import { IconMinus, IconPlus, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface SplitButtonProps {
    buttonText: string;
    prevAction: () => void;
    nextAction: () => void;
    // iconStyle = either "arrows" or "plusminus"
    iconStyle: "arrows" | "plusminus";
    loading?: boolean;
  }

export function SplitButton({ buttonText, prevAction, nextAction, iconStyle, loading = false }: SplitButtonProps) {
    return (
        <>
            <Group gap={0}>
                <Button
                    variant="default"
                    onClick={prevAction}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    disabled={loading}
                >
                {iconStyle === "arrows" && <IconChevronLeft size={20} />}
                {iconStyle === "plusminus" && <IconMinus size={20} />}
                </Button>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'var(--button-height, 36px)',
                        paddingLeft: 'var(--button-padding-x, 18px)',
                        paddingRight: 'var(--button-padding-x, 18px)',
                        borderTop: '1px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4))',
                        borderBottom: '1px solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4))',
                        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                        color: 'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
                        width: 120,
                        fontSize: 'var(--mantine-font-size-sm)',
                    }}
                >
                    {loading ? <Loader size="xs" /> : buttonText}
                </Box>
                <Button
                    variant="default"
                    onClick={nextAction}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    disabled={loading}
                >
                {iconStyle === "arrows" && <IconChevronRight size={20} />}
                {iconStyle === "plusminus" && <IconPlus size={20} />}
                </Button>
            </Group>
        </>
    );
}